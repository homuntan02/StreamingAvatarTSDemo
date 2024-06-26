import React, { useState } from 'react';
import './Controls.css'

interface ControlsProps {
  handleSpeak: () => void;
  grab: () => void;
  stop: () => void;
  speak: (input: string) => void;
}

const Controls: React.FC<ControlsProps> = ({ handleSpeak, grab, stop, speak }) => {
  const [text, setText] = useState<string>("");

  return (
    <div>
      <div className="Actions">
        <input
          className="InputField"
          placeholder='Enter Value Here'
          value={text}
          onChange={(v) => setText(v.target.value)}
        />
      </div>
        
        <div className='ButtonGroup'>
          <button className='SelectButton' onClick={handleSpeak}>Speak</button>
          <button className='SelectButton' onClick={grab}>Start</button>
          <button className='SelectButton' onClick={stop}>Stop</button>
          <button className='SelectButton' onClick={() => speak("You've selected travel")}>Hello</button>
        </div>
    </div>
  );
};

export default Controls;
