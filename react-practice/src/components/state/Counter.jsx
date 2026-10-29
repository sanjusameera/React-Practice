// Importing the useState hook
import { useState } from "react";

function Counter() {
  const initialValue = 0;

  // The state variable and setter function
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      {/* Display current state value */}
      <h2>{count}</h2>

      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;