import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";
import ThemeToggle from "./component/ThemeToggle";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const [copied, setCopied] = useState();

  //useRef hook
  const passwordRef = useRef(null);

  //password generator
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += " !@#$%^&*()_+<>? ";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center transition-colors duration-500 bg-white dark:bg-gray-950">
        <ThemeToggle></ThemeToggle>
        <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-blue-500 bg-gray-800 dark:bg-gray-700">
          <h1 className="text-white text-center my-3">PASSWORD GENERATOR</h1>
          <div className="bg-white flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className={`outline-none w-full py-1 px-3 transition-all duration-300 ease-in-out ${
                copied
                  ? "text-pink-500 shadow-lg scale-105"
                  : "text-black shadow-none scale-100"
              }`}
              placeholder="password"
              readOnly
              ref={passwordRef}
            />

            <button
              onClick={() => {
                if (passwordRef.current) {
                  //passwordRef.current.select();
                  window.navigator.clipboard.writeText(password);

                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }
              }}
              className="outline-none bg-blue-700 hover:bg-pink-800 transition-colors duration-200 text-white px-3 py-0.5 shrink-0"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              ></input>
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                value={length}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              ></input>
              <label htmlFor="numberInput">Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                value={length}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              ></input>
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
