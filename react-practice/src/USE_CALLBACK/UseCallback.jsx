// useCallback lets React reuse the same function reference 
// between renders, 
// as long as its dependencies haven’t changed.

import { memo, useCallback, useState } from "react";

const CounterButton = memo(function CounterButton({ onIncrease }) {
  console.log("CounterButton rendered");

  return (
    <div className="rounded-lg border border-gray-200 p-5">
      <h2 className="mb-2 text-lg font-semibold">Child Component</h2>

      <p className="mb-4 text-sm text-gray-600">
        Open the console to check when this component renders.
      </p>

      <button
        onClick={onIncrease}
        className="cursor-pointer rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Increase Count
      </button>
    </div>
  );
});

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [callbackEnabled, setCallbackEnabled] = useState(true);

  // Keeps the same function reference between renders.
  const cachedIncrement = useCallback(() => {
    setCount((previous) => previous + 1);
  }, []);

  // Has a new function reference on every render.
  const regularIncrement = () => {
    setCount((previous) => previous + 1);
  };

  return (
    <section className="mx-auto my-8 max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-gray-900">
      <h1 className="text-2xl font-bold">useCallback Demo</h1>

      <p className="mt-2 text-gray-600">
        Compare child renders with and without useCallback.
      </p>

      <label className="my-5 flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={callbackEnabled}
          onChange={(event) => setCallbackEnabled(event.target.checked)}
          className="h-4 w-4 accent-black"
        />
        Enable useCallback
      </label>

      <p className="mb-5 text-2xl font-bold">Count: {count}</p>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">
          Type to re-render the parent
        </span>

        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type something..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-black"
        />
      </label>

      <p className="my-4 text-sm text-gray-600">
        You typed: {text || "Nothing yet"}
      </p>

      <CounterButton
        onIncrease={
          callbackEnabled ? cachedIncrement : regularIncrement
        }
      />
    </section>
  );
}