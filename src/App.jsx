import { React, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, useRoutes} from "react-router-dom";
import ShowCreators from "./pages/ShowCreator.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";
import AddCreator from "./pages/AddCreator.jsx";

function RoutesA() {
  const element = useRoutes(
    [
      {path: "/", element: <ShowCreators/>},
      {path: "/view/:id", element: <ViewCreator/>},
      {path: "/edit/:id", element: <EditCreator/>},
      {path: "/add", element: <AddCreator/>},
    ]);
  return element;
}

function App() {

  // const RoutesA = () => useRoutes(
  //   [
  //   {path: "/", element: <ShowCreators/>},
  //   {path: "/view", element: <ViewCreator/>},
  //   {path: "/edit", element: <EditCreator/>},
  //   {path: "/add", element: <AddCreator/>},
  // ]);
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <RoutesA/>
    </Router>
    </>
  );
  //   <>
      /* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */
  //   </>
  // )
}

export default App;
