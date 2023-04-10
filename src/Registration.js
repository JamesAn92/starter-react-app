import React, { useState } from 'react';
import axios from 'axios';

function Registration(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        {
          username,
          password,
          email
        }
      );
      console.log(response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error(error.response.data);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegistration}>
        <span>Register</span>
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
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit">
          Register
        </button>
        <p>{message}</p>
      </form>
      <p>Already have an account? <button onClick={() => props.setIsRegistering(false)}>Login</button></p>
    </div>
  );
}

export default Registration;
