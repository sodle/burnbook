import React, { useState } from "react";
import cx from "classnames";
import "./App.css";

interface BurnBoxProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  burning: boolean;
  setBurning: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BurnButtonProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  burning: boolean;
  setBurning: React.Dispatch<React.SetStateAction<boolean>>;
}

function BurnBox({ text, setText, burning, setBurning }: BurnBoxProps) {
  const [burningPhase2, setBurningPhase2] = useState<boolean>(false);

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  return (
    <div className="burnbox-outer">
      <div className={cx("fire", { burning })}></div>
      <textarea
        ref={textAreaRef}
        style={
          burning
            ? {
                height: textAreaRef.current?.scrollHeight,
                transform: burningPhase2
                  ? `translateY(-${textAreaRef.current?.scrollHeight}px)`
                  : undefined,
              }
            : undefined
        }
        className={cx("burnbox", { burning })}
        value={text}
        placeholder="Type out an angry rant..."
        onChange={(e) => setText(e.target.value)}
        onTransitionEnd={(e) => {
          if (burning) {
            switch (e.propertyName) {
              case "height":
                setBurningPhase2(true);
                break;
              case "transform":
                setTimeout(() => {
                  setBurning(false);
                  setBurningPhase2(false);
                  setText("");
                }, 1000);
                break;
            }
          }
        }}
      />
    </div>
  );
}

function BurnButton({ text, setText, burning, setBurning }: BurnButtonProps) {
  return (
    <button
      className="burnbutton"
      disabled={burning}
      onClick={() => {
        setBurning(true);
      }}
    >
      Let it burn!
    </button>
  );
}

function App() {
  const [text, setText] = useState<string>("");
  const [burning, setBurning] = useState<boolean>(false);

  return (
    <div className="App">
      <BurnBox {...{ text, setText, burning, setBurning }} />
      <BurnButton {...{ text, setText, burning, setBurning }} />
    </div>
  );
}

export default App;
