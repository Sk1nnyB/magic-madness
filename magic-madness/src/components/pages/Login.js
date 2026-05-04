import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import './Login.css';

const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,30}$/;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateUsername = (value) => {
    const trimmed = value.trim();
    return USERNAME_REGEX.test(trimmed);
  };

  const validatePassword = (value) => {
    const trimmed = value.trim();
    return trimmed.length >= 8 && trimmed.length <= 128;
  };

  const findEmailFromUsername = async (value) => {
    const normalizedUsername = value.trim().toLowerCase();
    const usernameDoc = await getDoc(doc(db, 'usernames', normalizedUsername));
    if (!usernameDoc.exists()) {
      throw new Error('No account found for that username.');
    }
    const usernameData = usernameDoc.data();
    if (!usernameData || !usernameData.email) {
      throw new Error('Username mapping is invalid.');
    }
    return usernameData.email;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!validateUsername(trimmedUsername)) {
      setError('Username must be 3-30 characters and may include letters, numbers, . _ and -');
      return;
    }

    if (!validatePassword(trimmedPassword)) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const signInEmail = trimmedUsername.includes('@')
        ? trimmedUsername
        : await findEmailFromUsername(trimmedUsername);

      await signInWithEmailAndPassword(auth, signInEmail, trimmedPassword);
      setMessage('Successfully signed in. Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (signInError) {
      const code = signInError.code || '';
      if (code === 'auth/configuration-not-found') {
        setError('Firebase Auth is not configured correctly. Verify your authDomain and Email/Password sign-in settings in the Firebase console.');
      } else {
        setError(signInError.message || 'Could not sign in. Please check your credentials.');
      }
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2>Log In</h2>
        <p>Enter your account credentials to sign in.</p>
        {error && <div className='login-error'>{error}</div>}
        {message && <div className='login-success'>{message}</div>}
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />

          <button type='submit' className='login-button'>Log In</button>
        </form>
        <p className='login-switch'>Don't have an account? <Link to='/signup'>Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
