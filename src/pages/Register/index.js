import React, { useContext } from 'react';

import register from '../../assets/undraw_click_here_2li1.svg';
import {
  Button,
  FormLabel,
  TextInput,
  Box,
  SubTitle,
  Container,
  Form,
  StyledLink
} from '../../components/styled-components/styles';
import { UserContext } from '../../store/UserContext';

export default function Register({ history }) {
  const { setEmail, setPassword } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    history.push('/proceed-register');
  }

  return (
    <Container height="100%">
      <Box
        bgColor="#B276FF"
        color="#fff"
        gridColumn="1/8"
        alignItems="center"
        height="100%"
        style={{
          borderTopRightRadius: '62px',
          borderBottomRightRadius: '62px',
          boxShadow: '10px 0px 20px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Form onSubmit={handleSubmit}>
          <SubTitle marginBottom="42px" marginTop="212px" style={{ alignSelf: 'center' }}>
            Seja bem vindo! Vamos nos <br />
            conhecer um pouco...
          </SubTitle>
          <FormLabel htmlFor="email">E-MAIL *</FormLabel>
          <TextInput
            type="email"
            name="email"
            id="email"
            placeholder="Seu melhor e-mail"
            onChange={event => setEmail(event.target.value)}
            required
          />
          <FormLabel htmlFor="password">SENHA *</FormLabel>
          <TextInput
            type="password"
            name="password"
            id="password"
            placeholder="Sua senha super segura"
            onChange={event => setPassword(event.target.value)}
            required
          />

          <Button
            outline
            type="submit"
            marginTop="60px"
            marginBottom="15px"
            style={{ alignSelf: 'center' }}
          >
            Continuar
          </Button>
          <p style={{ alignSelf: 'center' }}>
            Já possui uma conta?{' '}
            <strong>
              <StyledLink color="#fff" to="/login">
                Fazer login!
              </StyledLink>
            </strong>
          </p>
        </Form>
      </Box>
      <Box gridColumn="8/10" style={{ zIndex: 2, marginTop: '112px', marginRight: '15px' }}>
        <img src={register} alt="" />
      </Box>
    </Container>
  );
}
