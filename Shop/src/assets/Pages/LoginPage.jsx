import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ for redirection

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("⚠️ Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Signup successful!");
        localStorage.setItem("token", data.token); // ✅ Save token like login
        navigate("/"); // ✅ Redirect to home
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error during signup");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
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
        <button onClick={handleSignup}>Continue</button>
        <p className="loginsignup-login">
          Already have an account? <Link to="/login"><span>Login here</span></Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
