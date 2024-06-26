import React, { useEffect, useRef } from 'react';
import './App.css';
import './AvatarDisplay.css'
interface AvatarDisplayProps {
  stream: MediaStream | undefined;
  setDebug: (message: string) => void;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ stream, setDebug }) => {
  const mediaStream = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug("Playing");
      };
    }
  }, [mediaStream, stream, setDebug]);

  return (
    <div className='MediaContainer'>
      <div className="MediaPlayer">
        <video playsInline autoPlay ref={mediaStream}></video>
      </div>
    </div>
  );
};

export default AvatarDisplay;
