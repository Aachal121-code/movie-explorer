import React, { useState } from 'react';
import Login from './components/Login';
import MovieExplorer from './components/MovieExplorer';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      <h1>Movie Explorer</h1>
      {/* <p>Welcome, {user}</p> */}
      <MovieExplorer />
    </div>
  );
}
export default App;
