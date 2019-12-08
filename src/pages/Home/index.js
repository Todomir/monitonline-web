import React from 'react';

import Nav from '../../components/Nav/index';
import studying from '../../assets/undraw_studying_s3l7.svg';
import coffee from '../../assets/undraw_getting_coffee_wntr.svg';

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
      <Box bgColor="#B276FF" color="#FFF" padding="0 230px" height="50%">
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
          <Box align="right">
            <img src={studying} width="833px" alt="" />
          </Box>
        </FlexWrapper>
      </Box>
      <Box bgColor="#F8F8F8" color="#3F3D56" padding="0 230px" height="50%">
        <FlexWrapper isInline>
          <Box>
            <img src={coffee} width="833px" alt="" />
          </Box>
          <Box align="right">
            <Title paddingTop="163px">Precisa de um help?</Title>
            <Paragraph>
              Deixa que a gente resolve! Encontre agora mesmo <br />
              um monitor para te auxiliar com suas dificuldades!
            </Paragraph>
            <Button marginTop="80px" marginBottom="105px">
              Procurar monitor
            </Button>
          </Box>
        </FlexWrapper>
      </Box>
    </>
  );
}
