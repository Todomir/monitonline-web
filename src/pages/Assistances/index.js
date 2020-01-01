import React, { useEffect, useContext } from 'react';
import {
  MdDashboard,
  MdAccessTime,
  MdChatBubbleOutline,
  MdPermIdentity,
  MdAssignmentInd,
  MdExitToApp
} from 'react-icons/md';
import { Spring } from 'react-spring/renderprops';

import AssistancesBlock from '../../components/AssistancesBlock';
import Status from '../../components/Status';
import {
  Box,
  Container,
  CardContainer,
  Title,
  SubTitle,
  MenuItem,
  MenuLogo,
  TextSmall,
  Paragraph,
  SmallLink
} from '../../components/styled-components/styles';
import api from '../../services/api';
import { logout } from '../../services/auth';
import { AssistanceContext } from '../../store/AssistanceContext';
import { UserContext } from '../../store/UserContext';

export default function Assistances({ history }) {
  const { tutorAssistances, setTutorAssistances } = useContext(AssistanceContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function getUser() {
      const response = await api.get('/users/auth/getUser');
      setUser(response.data);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function fetchTutorAssistances() {
      const response = await api.get(`/user/assistances/tutor/${user.id}`);
      setTutorAssistances(response.data);
    }

    fetchTutorAssistances();
  }, [user.id]);

  function handleLogout() {
    logout();
    history.push('/');
  }
  return (
    <Box isInline>
      <Spring from={{ width: 0, opacity: 0 }} to={{ width: 256, opacity: 1 }}>
        {props => (
          <Box style={props} width="256px" marginRight="75px" bgColor="#FFF" elevated>
            <Spring
              from={{ paddingRight: -10, opacity: 0 }}
              to={{ paddingRight: 0, opacity: 1 }}
              delay={500}
            >
              {props => (
                <>
                  <MenuLogo style={props}>Monitonline</MenuLogo>
                  <Box style={props} marginLeft="24px" marginBottom="40px" isInline>
                    <Box>
                      <TextSmall>{user.name}</TextSmall>
                      <TextSmall>{user.is_tutor ? 'Monitor(a)' : 'Aluno'}</TextSmall>
                    </Box>
                  </Box>
                  <MenuItem
                    style={props}
                    onClick={() => {
                      history.push('/user-profile');
                    }}
                  >
                    <MdDashboard /> Dashboard
                  </MenuItem>

                  <MenuItem
                    style={props}
                    onClick={() => {
                      history.push('/schedules');
                    }}
                  >
                    <MdAccessTime /> Horários
                  </MenuItem>

                  <MenuItem style={props}>
                    <MdChatBubbleOutline /> Comentários
                  </MenuItem>

                  <MenuItem
                    style={props}
                    onClick={() => {
                      history.push('/search-tutors');
                    }}
                  >
                    <MdPermIdentity /> Procurar monitor
                  </MenuItem>

                  <MenuItem style={props} isSelected>
                    <MdAssignmentInd /> Atendimentos
                  </MenuItem>

                  <MenuItem style={props} onClick={handleLogout}>
                    <MdExitToApp /> Logout
                  </MenuItem>
                </>
              )}
            </Spring>
          </Box>
        )}
      </Spring>
      <Box width="100%" height="auto" marginBottom="90px">
        <SubTitle marginTop="45px" marginBottom="20px">
          Atendimentos
        </SubTitle>
        <Container marginBottom="50px" width="100%" height="150px">
          <CardContainer padding="36px" bgColor="#FFF" gridColumn="1/5">
            <h3>ATENDIMENTOS REALIZADOS</h3>
            <Title>
              {
                tutorAssistances.filter(assistance => {
                  return assistance.status_id === 2;
                }).length
              }
            </Title>
          </CardContainer>
        </Container>
        <SubTitle marginTop="45px" marginBottom="20px">
          Meus assuntos
        </SubTitle>
        <Container width="100%">
          <CardContainer padding="36px" bgColor="#FFF" gridColumn="1/12">
            <AssistancesBlock />
          </CardContainer>
        </Container>
      </Box>
    </Box>
  );
}
