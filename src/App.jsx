import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-6 rounded-lg shadow-xl bg-gray-800 text-orange-400">
      <h1 className="text-2xl font-bold text-center mb-6">Password Generator</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full p-2 rounded-l bg-gray-700 text-white outline-none"
        />
        <button
          onClick={() => {
            window.navigator.clipboard.writeText(password);
          }}
          className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-r hover:bg-orange-600 transition"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <label className="whitespace-nowrap">Length: {length}</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Include Numbers</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={charAllowed}
            id="charInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput">Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
