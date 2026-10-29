import useStore from "./useStore";

function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const reset = useStore((state) => state.reset);

  return (
    <div>
      <h2>Counter</h2>

      <h1>{count}</h1>

      <button className="rounded  border-2 px-2 py-0" onClick={increment}>+</button>
      <button className="rounded  border-2 px-2 py-0" onClick={decrement}>-</button>
      <button className="rounded  border-2 px-2 py-0" onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;