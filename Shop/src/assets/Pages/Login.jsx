import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ useNavigate for redirect

  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Login successful!");
        localStorage.setItem("token", data.token);
        navigate("/"); // ✅ Redirect to home
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error during login");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p className="loginsignup-login">
          Don’t have an account? <Link to="/signup"><span>Sign up here</span></Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
