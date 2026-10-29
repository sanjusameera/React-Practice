// ======================== USE CONTEXT CODE ========================

// Context shares values; 
// Zustand stores and manages state as well.

import { useContext } from "react";
import { CounterContext } from "./USE_CONTEXT/CounterContext";

function CounterDisplay() {
  const { count } = useContext(CounterContext);

  return (
    <section className="mt-5 rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-xl font-semibold">Counter Display</h2>
      <p className="mt-4 text-4xl font-bold">{count}</p>
    </section>
  );
}

function CounterControls() {
  const { increment, decrement, reset } = useContext(CounterContext);

  const buttonClass =
    "cursor-pointer rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800";

  return (
    <section className="mt-5 rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-xl font-semibold">Counter Controls</h2>

      <div className="flex flex-wrap gap-3">
        <button className={buttonClass} onClick={decrement}>
          − Decrease
        </button>

        <button className={buttonClass} onClick={increment}>
          + Increase
        </button>

        <button className={buttonClass} onClick={reset}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 px-5 py-10 font-sans text-gray-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">useContext Demo</h1>

        <p className="mt-2 text-gray-600">
          Two components sharing one counter.
        </p>

        <CounterDisplay />
        <CounterControls />
      </div>
    </main>
  );
}






// // // REACT QUERY APP.JSX CODE

// import CreatePost from "./REACT_QUERY/components/CreatePost";
// import PostList from "./REACT_QUERY/components/PostList";

// function App() {
//   return (
//     <div className="app">
//       <h1>React Query Demo</h1>

//       <CreatePost />

//       <hr />

//       <PostList />
//     </div>
//   );
// }

// export default App;


// ====================ZUSTAND APP.JSX CODE=================================================== 

// import Counter from "./ZUSTAND/Counter";
// import User from "./ZUSTAND/User";
// import Theme from "./ZUSTAND/Theme";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10 text-gray-900">
//       <main className="mx-auto max-w-xl">
//         <h1 className="mb-8 text-center text-3xl font-bold">
//           Zustand Demo
//         </h1>

//         <section className="py-4">
//           <Counter />
//         </section>

//         <hr className="border-gray-300" />

//         <section className="py-4">
//           <User />
//         </section>

//         <hr className="border-gray-300" />

//         <section className="py-4">
//           <Theme />
//         </section>
//       </main>
//     </div>
//   );
// }

// export default App;







// =========== AG GRID APP.JSX CODE ========================


// import React from 'react'
// import AgGrid from './AG_GRID/AgGrid'

// const App = () => {
//   return (
//     <div>
//       <h1 className='text-3xl font-bold underline'>
//         Hello World!
//       </h1>
//     </div>
//   )
// }

// export default App;