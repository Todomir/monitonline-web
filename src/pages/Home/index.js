import React from 'react';

import Nav from '../../components/Nav/index';
import studying from '../../assets/undraw_studying_s3l7.svg';

import {
  Box,
  Title,
  Button,
  SubTitle,
  Paragraph,
  FlexWrapper
} from '../../components/styled-components/styles';

export default function Home() {
  return (
    <>
      <Nav />
      <Box bgColor="#B276FF" color="#FFF" padding="0 230px" height="512px">
        <FlexWrapper isInline>
          <Box>
            <Title paddingTop="163px">Monitonline</Title>
            <Paragraph>
              Um sistema de monitoria entre <strong>alunos</strong>, de <strong>alunos</strong>,
              para <strong>alunos</strong>.
            </Paragraph>
            <Button outline marginTop="80px" marginBottom="105px">
              Cadastre-se
            </Button>
          </Box>
          <Box>
            <img src={studying} width="633px" height="472px" alt="studying" />
          </Box>
        </FlexWrapper>
      </Box>
      <Box bgColor="#F8F8F8" color="#3F3D56" padding="0 230px" height="512px">
        <SubTitle paddingTop="163px">Precisa de um help?</SubTitle>
        <Paragraph>
          Deixa que a gente resolve! Encontre agora mesmo <br />
          um monitor para te auxiliar com suas dificuldades!
        </Paragraph>
        <Button marginTop="80px" marginBottom="105px">
          Procurar monitor
        </Button>
      </Box>
    </>
  );
}
