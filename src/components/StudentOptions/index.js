import React, { useState } from 'react';

import { MdDateRange } from 'react-icons/md';
import {
  StyledLink,
  SubTitle,
  CardContainer,
  CardContent,
  TextSmall
} from '../styled-components/styles';

import ToggleContainer from '../ToggleContainer';
import Assistances from '../Assistances';

export default function StudentOptions({ studentName, studentAssistances }) {
  const [assistanceToggle, setAssistanceToggle] = useState(false);

  const handleAssistanceClick = () => {
    setAssistanceToggle(!assistanceToggle);
  };

  return (
    <CardContainer>
      <CardContent>
        <SubTitle marginBottom="7px">Opções do aluno</SubTitle>
        <TextSmall marginBottom="20px">{studentName}</TextSmall>

        <StyledLink to="/search-tutors">
          <MdDateRange /> marcar atendimento
          <p>clique aqui para procurar um monitor agora mesmo!</p>
        </StyledLink>

        <StyledLink onClick={handleAssistanceClick}>
          <MdDateRange /> meus atendimentos
          <p>clique aqui para ver o status dos atendimentos marcados</p>
        </StyledLink>

        <ToggleContainer toggle={assistanceToggle}>
          <SubTitle marginTop="20px">Meus atendimentos</SubTitle>
          <TextSmall marginBottom="20px">{studentName}</TextSmall>
          <TextSmall>
            <Assistances assistances={studentAssistances} />
          </TextSmall>
        </ToggleContainer>
      </CardContent>
    </CardContainer>
  );
}
