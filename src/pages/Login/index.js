import React, { useState } from 'react';

import api from '../../services/api';
import { login } from '../../services/auth';

import {
  FormLabel,
  TextInput,
  Button,
  Title,
  StyledLink
} from '../../components/styled-components/styles';

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
      <Title>MONITONLINE | LOGIN</Title>

      <form onSubmit={handleSubmit}>
        <FormLabel>e-mail *</FormLabel>
        <TextInput
          type="email"
          name="email"
          id="email"
          onChange={event => setEmail(event.target.value)}
        />
        <FormLabel>senha *</FormLabel>
        <TextInput
          type="password"
          name="password"
          id="password"
          onChange={event => setPassword(event.target.value)}
        />
        <p>
          ainda não tem uma conta?{' '}
          <strong>
            <StyledLink to="/register">cadastre-se já!</StyledLink>
          </strong>
        </p>

        <Button type="submit">fazer login</Button>
      </form>
    </>
  );
}
