import React, { useState } from 'react';

import api from '../../services/api';
import { login } from '../../services/auth';

import {
  FormLabel,
  TextInput,
  Button,
  Title,
  StyledLink,
  SubTitle
} from '../../components/styled-components/styles';
import Modal from '../../components/Modal';

// import { Container } from './styles';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggle, setToggle] = useState(false);

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
          <StyledLink to={'/register'}>cadastre-se já!</StyledLink>
        </p>

        <Button type="submit">fazer login</Button>
        <Button onClick={() => setToggle(!toggle)}>
          testar modal
        </Button>
      </form>

      <Modal toggle={toggle}>
        <SubTitle>Teste de Modal</SubTitle>
        Esse é um teste do componente de modal.
        <Button onClick={() => setToggle(!toggle)}>
          fechar modal
        </Button>
      </Modal>
    </>
  );
}
