import React, { useState, useContext } from 'react';

import { MdDateRange, MdMessage } from 'react-icons/md';
import {
  StyledLink,
  SubTitle,
  CardContainer,
  CardContent,
  TextSmall
} from '../styled-components/styles';

import ToggleContainer from '../ToggleContainer';
import Assistances from '../Assistances';

import { UserContext } from '../../store/UserContext';
import { AssistanceContext } from '../../store/AssistanceContext';

export default function StudentOptions() {
  const { name } = useContext(UserContext);
  const { studentAssistances, setCurrentAssistance } = useContext(AssistanceContext);

  const [assistanceToggle, setAssistanceToggle] = useState(false);

  const handleAssistanceClick = () => {
    setAssistanceToggle(!assistanceToggle);
  };

  return (
    <CardContainer>
      <CardContent>
        <SubTitle marginBottom="7px">Opções do aluno</SubTitle>
        <TextSmall marginBottom="20px">{name}</TextSmall>

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
          <TextSmall marginBottom="20px">{name}</TextSmall>
          {studentAssistances.map(assistance => (
            <TextSmall
              onClick={() => {
                setCurrentAssistance(assistance);
              }}
              marginBottom="20px"
            >
              <Assistances assistance={assistance} name={assistance.name} />
              <StyledLink
                color="#FFF"
                background="#2575f2"
                padding="5px"
                fontSize="12px"
                fontWeight="bold"
                to="/comments"
              >
                <MdMessage /> deixar comentário
              </StyledLink>
            </TextSmall>
          ))}
        </ToggleContainer>
      </CardContent>
    </CardContainer>
  );
}
