import { createContext, useState } from "react";

// Create the context.
export const CounterContext = createContext(null);

// Make counter state available to components inside this provider.
export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((previousCount) => previousCount + 1);
  }

  function decrement() {
    setCount((previousCount) => previousCount - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <CounterContext.Provider
      value={{ count, increment, decrement, reset }}
    >
      {children}
    </CounterContext.Provider>
  );
}