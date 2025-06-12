import React, { useState } from 'react';
import Login from './components/Login';
import MovieExplorer from './components/MovieExplorer';
import './App.css';
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      <Navbar />
      <MovieExplorer />
    </div>
  );
}
export default App;
