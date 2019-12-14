import React from 'react';

import Nav from '../../components/Nav';
import { Box, Title, Button, Paragraph } from '../../components/styled-components/styles';
import studying from '../../assets/undraw_studying_s3l7.svg';
import coffee from '../../assets/undraw_getting_coffee_wntr.svg';

export default function Home({ history }) {
  return (
    <Box height="100%">
      <Nav />
      <Box bgColor="#B276FF" color="#FFF" padding="0 230px" isInline>
        <Box marginRight="auto">
          <Title paddingTop="163px">Monitonline</Title>
          <Paragraph>
            Um sistema de monitoria entre <strong>alunos</strong>, de <strong>alunos</strong>, para{' '}
            <strong>alunos</strong>.
          </Paragraph>

          <Box isInline>
            <Button
              outline
              marginTop="80px"
              marginBottom="105px"
              onClick={() => {
                history.push('/register');
              }}
            >
              Cadastre-se
            </Button>

            <Button
              outline
              marginTop="80px"
              marginBottom="105px"
              onClick={() => {
                history.push('/login');
              }}
            >
              Fazer login
            </Button>
          </Box>
        </Box>
        <Box>
          <img src={studying} width="880px" alt="" />
        </Box>
      </Box>
      <Box bgColor="#F8F8F8" color="#3F3D56" padding="0 230px" isInline>
        <Box marginTop="30px" marginRight="auto">
          <img src={coffee} width="880px" alt="" />
        </Box>
        <Box align="right">
          <Title paddingTop="163px">Precisa de um help?</Title>
          <Paragraph>
            Deixa que a gente resolve! Encontre agora mesmo <br />
            um monitor para te auxiliar com suas dificuldades!
          </Paragraph>
          <Button marginTop="80px" marginBottom="105px" style={{ alignSelf: 'end' }}>
            Procurar monitor
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
