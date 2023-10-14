import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState("fdsf");
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const passRef = useRef(null);

  const createPassword = useCallback(() => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (isNumberAllowed) chars += "1234567890";
    if (isCharAllowed) chars += "{}()+_-`$&#";

    for (let i = 0; i < length; i++) {
      const newChar = Math.floor(Math.random() * chars.length + 1);
      pass += chars.charAt(newChar);
    }
    setPassword(pass);
  }, [setPassword, length, isNumberAllowed, isCharAllowed]);

  useEffect(() => {
    createPassword();
  }, [setPassword, length, isNumberAllowed, isCharAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-zinc-800 mt-20 p-16">
      <h1 className="text-center p-3 text-slate-400 text-3xl font-bold">
        Password Generator
      </h1>
      <div className="p-5 flex justify-center">
        <input
          type="text"
          placeholder="Password"
          value={password}
          className="w-full  h-14 p-2 outline-none bg-slate-400 text-slate-800 text-lg font-bold"
          ref={passRef}
          readOnly
        />
        <button onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className="p-5 flex justify-center flex-col gap-3">
        <div className="flex items-center">
          <input
            type="range"
            name="password-length"
            id="passwordLength"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            min={0}
            max={100}
          />
          <label htmlFor="passwordLength" className="mx-3">
            Password length {length}
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="numbers"
            className="h-6 w-6"
            value={isNumberAllowed}
            onChange={() => setIsNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numbers" className="mx-3 text-md ">
            Include Numbers
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="specialCharacter"
            className="h-6 w-6"
            defaultChecked={isCharAllowed}
            onChange={() => setIsCharAllowed((prev) => !prev)}
          />
          <label htmlFor="specialCharacter" className="mx-3 text-md ">
            Include special chararcter
          </label>
        </div>
      </div>
      <button onClick={createPassword} className="mx-5">
        New Password
      </button>
    </div>
  );
}

export default App;
