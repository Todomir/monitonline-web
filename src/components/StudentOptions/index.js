import React from 'react';

import { MdDateRange } from 'react-icons/md';
import { StyledLink, SubTitle, CardContainer, CardContent, TextSmall } from '../styled-components/styles';

export default function StudentOptions({ studentName }) {
  return (
    <CardContainer>
      <CardContent>
        <SubTitle marginBottom="7px">Opções do aluno</SubTitle>
        <TextSmall marginBottom="20px">{studentName}</TextSmall>

        <StyledLink to="/search-tutors">
          <MdDateRange /> marcar atendimento
          <p>clique aqui para procurar um monitor agora mesmo!</p>
        </StyledLink>

        <StyledLink to="/search-tutors">
          <MdDateRange /> meus atendimentos
          <p>clique aqui para ver o status dos atendimentos marcados</p>
        </StyledLink>
      </CardContent>
    </CardContainer>
  );
}
