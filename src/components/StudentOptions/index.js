import React from 'react';

import { MdDateRange } from 'react-icons/md';
import { StyledLink, SubTitle } from '../styled-components/styles';

export default function StudentOptions() {
  return (
    <>
      <SubTitle>Opções do aluno</SubTitle>

      <StyledLink to={'/search-tutors'}>
        <MdDateRange /> marcar atendimento
        <p>clique aqui para procurar um monitor agora mesmo!</p>
      </StyledLink>

      <StyledLink to={'/search-tutors'}>
        <MdDateRange /> meus atendimentos
        <p>clique aqui para ver o status dos atendimentos marcados</p>
      </StyledLink>
    </>
  );
}
