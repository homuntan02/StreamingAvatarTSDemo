import { useEffect, useRef, useState } from 'react';
import { Configuration, NewSessionData, StreamingAvatarApi } from '@heygen/streaming-avatar';
import './App.css';
import AvatarDisplay from './AvatarDisplay';
import Controls from './Controls';


function App() {
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [text, setText] = useState<string>("");
  const [chatGPTText, setChatGPTText] = useState<string>("");
  const [avatarId, setAvatarId] = useState<string>("");
  const [voiceId, setVoiceId] = useState<string>("");
  const [data, setData] = useState<NewSessionData>();
  const [initialized, setInitialized] = useState(false); // Track initialization
  const [recording, setRecording] = useState(false); // Track recording state
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // Store recorded audio
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatarApi | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  async function fetchAccessToken() {
    try {
      const response = await fetch('http://localhost:3001/get-access-token', {
        method: 'POST'
      });
      const result = await response.json();
      const token = result.token; // Access the token correctly
      console.log('Access Token:', token); // Log the token to verify
      return token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return '';
    }
  }

  async function grab() {
    setAvatarId("josh_lite3_20230714") // here doesnt work
    setVoiceId("fd26a72bd7724dbea95e4ad5db3a78bc") // here too

    await updateToken();


    if (!avatar.current) {
      setDebug('Avatar API is not initialized');
      return;
    }

    try {
      const res = await avatar.current.createStartAvatar(
        {
          newSessionRequest: {
            quality: "low",
            avatarName:"josh_lite3_20230714" /*avatarId*/,
            voice: { voiceId: "fd26a72bd7724dbea95e4ad5db3a78bc"/*voiceId*/ }
          }
        }, setDebug);
      setData(res);
      setStream(avatar.current.mediaStream);
    } catch (error) {
      console.error('Error starting avatar session:', error);
    }
  };

  async function updateToken() {
    const newToken = await fetchAccessToken();
    console.log('Updating Access Token:', newToken); // Log token for debugging
    avatar.current = new StreamingAvatarApi(
      new Configuration({ accessToken: newToken })
    );

    const startTalkCallback = (e: any) => {
      console.log("Avatar started talking", e);
    };

    const stopTalkCallback = (e: any) => {
      console.log("Avatar stopped talking", e);
    };

    console.log('Adding event handlers:', avatar.current);
    avatar.current.addEventHandler("avatar_start_talking", startTalkCallback);
    avatar.current.addEventHandler("avatar_stop_talking", stopTalkCallback);

    setInitialized(true);
  }

  async function stop() {
    if (!initialized || !avatar.current) {
      setDebug('Avatar API not initialized');
      return;
    }
    await avatar.current.stopAvatar({ stopSessionRequest: { sessionId: data?.sessionId } }, setDebug);
  }

  async function handleSpeak() {
    if (!initialized || !avatar.current) {
      setDebug('Avatar API not initialized');
      return;
    }
    await avatar.current.speak({ taskRequest: { text: text, sessionId: data?.sessionId } }).catch((e) => {
      setDebug(e.message);
    });
  }

  // async function handleChatGPT() {

  //   if (!chatGPTText) {
  //     setDebug('Please enter text to send to ChatGPT');
  //     return;
  //   }

  //   try {
  //     const response = await openai.chat.completions.create({  //Send the user input to ChatGPT
  //       model: "gpt-4o",
  //       messages: [{ role: "system", content: "You are a helpful assistant." },
  //                  { role: "user", content: chatGPTText }],
  //     });

  //     const chatGPTResponse = String(response.choices[0].message.content);
  //     console.log('ChatGPT Response:', chatGPTResponse);

  //     if (!initialized || !avatar.current) {
  //       setDebug('Avatar API not initialized');
  //       return;
  //     }

  //     //send the ChatGPT response to the Streaming Avatar
  //     await avatar.current.speak({ taskRequest: { text: chatGPTResponse, sessionId: data?.sessionId } }).catch((e) => {
  //       setDebug(e.message);
  //     });

  //   } catch (error) {
  //     console.error('Error communicating with ChatGPT:', error);
  //   }
  // }

  async function speak(input: string){
    if (!initialized || !avatar.current) {
      setDebug('Avatar API not initialized');
      return;
    }

    //send the ChatGPT response to the Streaming Avatar
    await avatar.current.speak({ taskRequest: { text: input, sessionId: data?.sessionId } }).catch((e) => {
      setDebug(e.message);
    });
  };
  

  useEffect(() => {
    async function init() {
      const newToken = await fetchAccessToken();
      console.log('Initializing with Access Token:', newToken); // Log token for debugging
      avatar.current = new StreamingAvatarApi(
        new Configuration({ accessToken: newToken })
      );
      setInitialized(true); // Set initialized to true
    };
    init();
  }, []);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug("Playing");
      }
    }
  }, [mediaStream, stream]);

  // const stopRecording = () => {
  //   if (mediaRecorder.current) {
  //     mediaRecorder.current.stop();
  //     setRecording(false);
  //   }
  // };


return (
  <div className="HeyGenStreamingAvatar">
    <header className="App-header">
      <AvatarDisplay stream={stream} setDebug={setDebug} />
      <Controls
        handleSpeak={handleSpeak}
        grab={grab}
        stop={stop}
        speak={speak}
      />
    </header>
  </div>
);
}

export default App;
