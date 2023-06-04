import logo from './logo.svg';
import './App.css';
import Shuffler from './Shuffle';

function App() {
  return (
    <div className="App">
      <head>
        <title>Shuffle</title>
      </head>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <section>
        <Shuffler />
      </section>
    </div>
  );
}

export default App;
