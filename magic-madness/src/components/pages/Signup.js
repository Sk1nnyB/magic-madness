import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import './Login.css';

const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,30}$/;
const NICKNAME_REGEX = /^[a-zA-Z0-9 _.-]{3,30}$/;

function Signup() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
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

  const validateEmail = (value) => {
    const trimmed = value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  };

  const validateNickname = (value) => {
    const trimmed = value.trim();
    return NICKNAME_REGEX.test(trimmed);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const normalizedUsername = username.trim().toLowerCase();
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const nicknameValue = nickname.trim();

    if (!validateUsername(normalizedUsername)) {
      setError('Username must be 3-30 characters and may include letters, numbers, . _ and -');
      return;
    }

    if (!validateEmail(emailValue)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validateNickname(nicknameValue)) {
      setError('Nickname must be 3-30 characters and may include letters, numbers, spaces, ., _, and -');
      return;
    }

    if (!validatePassword(passwordValue)) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const usernameDoc = await getDoc(doc(db, 'usernames', normalizedUsername));
      if (usernameDoc.exists()) {
        setError('That username is already taken. Choose a different one.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: nicknameValue,
      });

      await setDoc(doc(db, 'usernames', normalizedUsername), {
        email: emailValue,
        uid: user.uid,
        nickname: nicknameValue,
        createdAt: serverTimestamp(),
      });

      await setDoc(doc(db, 'users', user.uid), {
        username: normalizedUsername,
        nickname: nicknameValue,
        email: emailValue,
        createdAt: serverTimestamp(),
      });

      setMessage('Account created successfully. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (signUpError) {
      const code = signUpError.code || '';
      if (code === 'auth/configuration-not-found') {
        setError('Firebase Auth is not configured for email/password sign-in. Enable Email/Password sign-in in the Firebase console and verify your authDomain.');
      } else {
        setError(signUpError.message || 'Unable to create account.');
      }
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2>Sign Up</h2>
        <p>Create a username-based account using Firebase Authentication.</p>
        {error && <div className='login-error'>{error}</div>}
        {message && <div className='login-success'>{message}</div>}
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Choose a username'
            required
          />

          <label htmlFor='nickname'>Nickname</label>
          <input
            id='nickname'
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder='Enter a display nickname'
            required
          />

          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
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

          <button type='submit' className='login-button'>Create Account</button>
        </form>
        <p className='login-switch'>Already have an account? <Link to='/login'>Log in</Link></p>
      </div>
    </div>
  );
}

export default Signup;
