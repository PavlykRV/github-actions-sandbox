import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  console.log('import.meta.env:', import.meta.env);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h4>Unified CI/CD</h4>
      <pre>checkin staging deploy from dev branch #4</pre>
      <h1>Vite + React</h1>
      <h2>Environment: {import.meta.env.TEST_ENV_VARIABLE}</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count} $</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
