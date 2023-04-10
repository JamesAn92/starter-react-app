import React, { useState } from 'react'
import axios from 'axios'
import Dashboard from './Dashboard';
import Registration from './Registration';
import './Login.css'
import { Link } from 'react-router-dom';


function Login( { loggedIn, setLoggedIn, username, setUsername, password, setPassword, user, setUser, accessToken, setAccessToken, refreshToken, setRefreshToken, isRegistering, setIsRegistering }) {


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });      
      setUser(res.data);
      setAccessToken(res.headers['auth-token-access']);
      setRefreshToken(res.headers['auth-token-refresh']);
      setLoggedIn(true);  
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogout = () => {
    setUser({});
    setAccessToken('');
    setRefreshToken('');
    setLoggedIn(false);   
  }

  if (user?.role === 'admin') {
    return (
      <div>
        <h1>Welcome {user.username}</h1>
        <Dashboard accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} />
        <Link to = {`/`}>
        <button className='logout-button' onClick={handleLogout}>Logout</button>
        </Link>
      </div>
    );
  } else if (user?.username) {
    return (
      <div>
        <h1>Welcome {user.username}</h1>
        <Link to = {`/`}>
        <button className='logout-button' onClick={handleLogout}>Logout</button>
        </Link>
      </div>
    );
  } else if (isRegistering) {
    return (
      <Registration setIsRegistering={setIsRegistering} />
    );
  } else {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <span> Admin Login </span>
          <br />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">
            Login
          </button>
        </form>
        <p>Don't have an account? <button onClick={() => setIsRegistering(true)}>Register</button></p>
      </div>
    );
  }
}

export default Login;
