import React from 'react';
import { MdArrowForward } from 'react-icons/md';

import Nav from '../../components/Nav';
import {
  Container,
  Box,
  Button,
  SubTitle,
  Paragraph
} from '../../components/styled-components/styles';

export default function TutorError({ history }) {
  function handleReturn() {
    history.goBack();
  }

  return (
    <>
      <Nav isLight />
      <Container height="100%">
        <Box marginTop="141px" alignItems="center" gridColumn="2/12">
          <SubTitle>Calma lá, meu consagrado...</SubTitle>
          <Paragraph>Você precisa ser um monitor para acessar essa página.</Paragraph>
          <Button onClick={handleReturn} marginTop="30px">
            <MdArrowForward /> Retornar à página anterior
          </Button>
        </Box>
      </Container>
    </>
  );
}
