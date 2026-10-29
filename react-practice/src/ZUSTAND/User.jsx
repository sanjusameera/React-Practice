import { useState } from "react";
import useStore from "./useStore";

function User() {
  const username = useStore((state) => state.username);
  const setUsername = useStore((state) => state.setUsername);

  const [input, setInput] = useState(username);

  const handleChange = () => {
    setUsername(input);
  };

  return (
    <div>
      <h2>User</h2>

      <p>Username: {username}</p>

      <input 
        className="rounded  border-2 px-2 py-0"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="rounded  border-2 px-2 py-0" onClick={handleChange}>
        Change Username
      </button>
    </div>
  );
}

export default User;