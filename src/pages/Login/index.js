import React, { useState } from 'react';

import auth from '../../assets/undraw_authentication_fsn5.svg';
import {
  FormLabel,
  TextInput,
  Button,
  StyledLink,
  Box,
  SubTitle,
  Container,
  Form
} from '../../components/styled-components/styles';
import api from '../../services/api';
import { login } from '../../services/auth';

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
    history.push('/user-profile');
  }

  return (
    <Container height="100%">
      <Box gridColumn="2/6" style={{ zIndex: 2, marginTop: '200px' }}>
        <img src={auth} width="130%" alt="" />
      </Box>
      <Box
        bgColor="#B276FF"
        color="#fff"
        gridColumn="6/13"
        alignItems="center"
        height="100%"
        style={{
          borderTopLeftRadius: '62px',
          borderBottomLeftRadius: '62px',
          boxShadow: '-10px 0px 20px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Form onSubmit={handleSubmit} width="60%">
          <SubTitle marginBottom="42px" marginTop="212px" style={{ alignSelf: 'center' }}>
            Bem-vindo de volta! <br />
            Faça seu login aqui.
          </SubTitle>
          <FormLabel>E-mail *</FormLabel>
          <TextInput
            type="email"
            name="email"
            id="email"
            onChange={event => setEmail(event.target.value)}
          />
          <FormLabel>Senha *</FormLabel>
          <TextInput
            type="password"
            name="password"
            id="password"
            onChange={event => setPassword(event.target.value)}
          />

          <Button
            outline
            type="submit"
            marginTop="60px"
            marginBottom="15px"
            style={{ alignSelf: 'center' }}
          >
            Fazer login
          </Button>
          <p style={{ alignSelf: 'center' }}>
            Ainda não tem uma conta?{' '}
            <strong>
              <StyledLink to="/register">Cadastre-se já!</StyledLink>
            </strong>
          </p>
        </Form>
      </Box>
    </Container>
  );
}
