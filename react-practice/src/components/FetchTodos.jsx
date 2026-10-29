import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const FetchTodos = () => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher
  );

  if (!data) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>Todos</h2>
      <div>
        {data.map((todo) => (
          <h3 key={todo.id}>{todo.title}</h3>
        ))}
      </div>
    </>
  );
};

export default FetchTodos;