import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin, onBack }) {
  const [flipped, setFlipped] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [signupUser, setSignupUser] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginUser || !loginPass) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(data.username);
        navigate("/");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupUser || !signupPass) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: signupUser, password: signupPass }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Sign up successful! You can now sign in.");
        setFlipped(false);
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    alert("Password reset link sent to " + forgotEmail);
    setShowForgot(false);
  };

  return (
    <div className="auth-bg">
      <button className="auth-back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back
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
              onChange={(e) => setLoginUser(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
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
              onChange={(e) => setSignupUser(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPass}
              onChange={(e) => setSignupPass(e.target.value)}
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
                onChange={(e) => setForgotEmail(e.target.value)}
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
