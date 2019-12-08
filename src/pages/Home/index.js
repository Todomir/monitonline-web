import React from 'react';
import { Box, Title, Button, SubTitle } from '../../components/styled-components/styles';

export default function Home() {
  return (
    <>
      <Box bgColor="#B276FF" color="#FFF" padding="0 230px" height="512px">
        <Title paddingTop="163px">Monitonline</Title>
        <p>
          Um sistema de monitoria entre <strong>alunos</strong>, de <strong>alunos</strong>, para{' '}
          <strong>alunos</strong>.
        </p>
        <Button outline marginTop="80px" marginBottom="105px">
          Cadastre-se
        </Button>
      </Box>
      <Box bgColor="#F8F8F8" color="#3F3D56" padding="0 230px" height="512px">
        <SubTitle paddingTop="163px">Precisa de um help?</SubTitle>
        <p>
          Deixa que a gente resolve! Encontre agora mesmo <br />
          um monitor para te auxiliar com suas dificuldades!
        </p>
        <Button marginTop="80px" marginBottom="105px">
          Procurar monitor
        </Button>
      </Box>
    </>
  );
}
