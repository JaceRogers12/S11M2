import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const toggleFormMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setMessage('')
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (isLogin) {
      axios.post(`http://localhost:3003/api/auth/login`, {username: username, password: password})
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          navigate("/stars");
        })
        .catch(res => {
          console.log(res);
          setError(res.response.data.message);
        })
    } else {
      axios.post(`http://localhost:3003/api/auth/register`, {username: username, password: password})
        .then(res => {
          console.log(res);
          setMessage(res.data.message);
        })
        .catch(res => {
          console.log(res);
          setError(res.response.data.message);
        })
    }
  }

  return (
    <div className="container">
      <div aria-live="polite">{message}</div>
      <div aria-live="assertive" style={{ color: 'red' }}>{error}</div>
      <h3>{isLogin ? 'Login' : 'Register'}
        <button onClick={toggleFormMode}>
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>
      </h3>
      <form onSubmit={event => handleSubmit(event)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </div>
  )
}
