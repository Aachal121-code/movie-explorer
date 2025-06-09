import React, { useState } from 'react';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      <h1>Movie Explorer</h1>
      <p>Welcome, {user}</p>
    </div>
  );
}
export default App;
