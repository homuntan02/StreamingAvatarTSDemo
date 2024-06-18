# Getting Started with Create React App

This is a sample project and was bootstrapped using [Create React App](https://github.com/facebook/create-react-app)
Feel free to play around with the existing code and please leave any feedback for the SDK [here](https://github.com/HeyGen-Official/StreamingAvatarSDK/discussions).

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app and the server in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Getting Started FAQ

### Installing the demo

1. Clone this repo
2. Navigate to the containing folder in your terminal
3. Run 'npm install' (assuming you have npm installed. If not, please follow these instructions: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
4. Go to the 'Server' folder, and enter your HeyGen Enterprise API Token or Trial Token in the '.env' file. This will allow the Client app to generate secure Access Tokens with which to create streaming sessions.

You can retrieve either the API Key or Trial Token by logging in to HeyGen and navigating to this page in your settings: [https://app.heygen.com/settings?nav=API]. 

### Difference between Trial Token and Enterprise API Token

The HeyGen Trial Token is available to all users, not just Enterprise users, and allows for testing of the Streaming API, as well as other HeyGen API endpoints.

Each Trial Token is limited to 3 concurrent streaming sessions. However, every streaming session you create with the Trial Token is free of charge, no matter how many tasks are sent to the avatar. Please note that streaming sessions will automatically close after 10 minutes of no tasks sent.

If you do not 'close' the streaming sessions and try to open more than 3, you will encounter errors including stuttering and freezing of the Streaming Avatar. Please endeavor to only have 3 sessions open at any time while you are testing the Streaming Avatar API with your Trial Token.

### Starting sessions

To start your 'session' with a Streaming Avatar, first click the 'start' button. If your HeyGen API key is entered into the Server's .env file, then you should see our demo Streaming Avatar (Monica!) appear. 

After you see Monica appear on the screen, you can enter text into the input field with 'Type something to say' written, and then click the 'Speak' button. The Streaming Avatar will say the text you enter.

If you want to see a different Avatar or try a different voice, you can close the session and enter the IDs and then 'start' the session again. Please see below for information on where to retrieve different Avatar and voice IDs that you can use.

### Connecting to OpenAI

A common use case for a Streaming Avatar is to use it as the 'face' of an LLM that users can interact with. In this demo we have included functionality to showcase this by both accepting user input via voice (using OpenAI's Whisper library) and also sending that input to an OpenAI LLM model (using their Chat Completions endpoint).

Both of these features of this demo require an OpenAI API Key. If you do not have a paid OpenAI account, you can learn more on their website: [https://openai.com/index/openai-api/]

Without an OpenAI API Key, this functionality will not work, and the Streaming Avatar will only be able to repeat text input that you provide, and not demonstrate being the 'face' of an LLM. Regardless, this demo is meant to demonstrate what kinds of apps and experiences you can build with our Streaming Avatar SDK, so you can code your own connection to a different LLM if you so choose.

To add your Open AI API Key, go to the 'Client' folder, open 'App.tsx', and put in your OpenAI API key where indicated. 

### How does the integration with OpenAI / ChatGPT work?

In this demo, we are calling the Chat Completions API from OpenAI in order to come up with some response to user input. You can see the relevant code in client/app.tsx.

You can see that there are two 'messages' sent here in the call to the gpt-4o model. One has the Role parameter set to 'system', and the the other is a message with the role 'user'. 

In the 'system' message, you can replace the 'content' parameter with whatever 'knowledge base' or context that you would like the GPT-4o model to reply to the user's input with. 

You can explore this API and the different parameters and models available here: [https://platform.openai.com/docs/guides/text-generation/chat-completions-api]

### Which Avatars can I use with this project?

By default, there are several Public Avatars that can be used in Streaming. (AKA Streaming Avatars.) You can find the Avatar IDs for these Public Avatars by navigating to [app.heygen.com/streaming-avatar](https://app.heygen.com/streaming-avatar) and clicking 'Select Avatar' and copying the avatar id.

In order to use a private Avatar created under your own account in Streaming, it must be upgraded to be a Streaming Avatar. Only 1. Finetune Instant Avatars and 2. Studio Avatars are able to be upgraded to Streaming Avatars. This upgrade is a one-time fee and can be purchased by navigating to [app.heygen.com/streaming-avatar] and clicking 'Select Avatar'.

Photo Avatars are not compatible with Streaming and cannot be used.

### Which voices can I use with my Streaming Avatar?

Most of HeyGen's AI Voices can be used with the Streaming API. To find the Voice IDs that you can use, please use the List Voices v2 endpoint from HeyGen: [https://docs.heygen.com/reference/list-voices-v2]

### Where can I read more about enterprise-level usage of the Streaming API?

Please read our Streaming Avatar 101 article for more information on pricing and how to increase your concurrent session limit: https://help.heygen.com/en/articles/9182113-streaming-avatar-101-your-ultimate-guide