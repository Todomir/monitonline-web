import React from 'react';

import Nav from '../../components/Nav';
import { Container, Box, SubTitle, Paragraph } from '../../components/styled-components/styles';

export default function AuthError() {
  return (
    <>
      <Nav isLight />
      <Container height="100%">
        <Box marginTop="141px" alignItems="center" gridColumn="2/12">
          <SubTitle>Calma lá, meu consagrado...</SubTitle>
          <Paragraph>Você precisa estar logado para acessar essa página.</Paragraph>
        </Box>
      </Container>
    </>
  );
}
