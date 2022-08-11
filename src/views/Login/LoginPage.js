import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUID } from 'generalSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const onLogin = e => {
    e.preventDefault();

    if (validate()) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password)
        .then(data => {
          dispatch(setUID(data.user.uid));
          navigate('/overview');
        })
        .catch(e => {
          setErrorMessage('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
          setErrors(['email', 'password']);
        });
    } else {
      setErrorMessage('Bitte überprüfen Sie Ihre Eingaben.');
    }
  };

  const validate = () => {
    const currentErrors = [];

    if (!email || !password) {
      if (!email) currentErrors.push('email');
      if (!password) currentErrors.push('password');
    }

    setErrors(currentErrors);

    return currentErrors.length === 0;
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="page-headline">Login</div>

      {errorMessage ? <div className="p-4 border border-red-600 rounded text-red-600 mb-4">{errorMessage}</div> : ''}

      <div className="mb-4">
        <label htmlFor="login-email">E-Mail</label>
        <input
          type="text"
          id="login-email"
          value={email}
          className={`${errors.includes('email') ? 'error' : ''}`}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="login-password">Passwort</label>
        <input
          type="password"
          id="login-password"
          value={password}
          className={`${errors.includes('password') ? 'error' : ''}`}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={onLogin}
        className="button w-full"
      >
        Einloggen
      </button>
    </div>
  );
};

export default LoginPage;
