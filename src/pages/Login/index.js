import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { login } from '../../services/auth';
import './styles.css';

// import { Container } from './styles';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post('/users/auth', {
      email,
      password
    });
    login(response.data.token);
    history.push('/userpage');
  }

  return (
    <>
      <h1>MONITONLINE | LOGIN</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">e-mail *</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor="password">senha *</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={event => setPassword(event.target.value)}
        />
        <p>
          ainda não tem uma conta?{' '}
          <Link to={'/register'} className="register-link">
            cadastre-se já!
          </Link>
        </p>

        <button type="submit">fazer login</button>
      </form>
    </>
  );
}
