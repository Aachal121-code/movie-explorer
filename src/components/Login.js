import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin, onBack }) {
  const [flipped, setFlipped] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // States for forms
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [signupUser, setSignupUser] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  // Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser && loginPass) {
      onLogin(loginUser);
    } else {
      alert("Please enter username and password");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Sign up successful! You can now sign in.");
    setFlipped(false);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    alert("Password reset link sent to " + forgotEmail);
    setShowForgot(false);
  };

  return (
    <div className="auth-bg">
      <button className="auth-back-btn" onClick={onBack}>
        ← Back
      </button>
      <div className={`auth-card${flipped ? " flipped" : ""}`}>
        {/* Sign In */}
        <div className="auth-card-face auth-card-front">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={loginUser}
              onChange={e => setLoginUser(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPass}
              onChange={e => setLoginPass(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>
          <div className="auth-links">
            <button type="button" onClick={() => setShowForgot(true)}>
              Forgot Password?
            </button>
            <button type="button" onClick={() => setFlipped(true)}>
              Sign Up
            </button>
          </div>
        </div>
        {/* Sign Up */}
        <div className="auth-card-face auth-card-back">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={signupUser}
              onChange={e => setSignupUser(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPass}
              onChange={e => setSignupPass(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <div className="auth-links">
            <button type="button" onClick={() => setFlipped(false)}>
              Already have an account?
            </button>
          </div>
        </div>
      </div>
      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <h3>Forgot Password</h3>
            <form onSubmit={handleForgot}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                required
              />
              <button type="submit">Send Reset Link</button>
            </form>
            <button className="auth-close" onClick={() => setShowForgot(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;