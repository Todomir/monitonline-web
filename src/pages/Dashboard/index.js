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

import Status from '../../components/Status';
import {
  Box,
  MenuLogo,
  MenuItem,
  Container,
  Title,
  SubTitle,
  TextSmall,
  CardContainer,
  SmallLink,
  Button
} from '../../components/styled-components/styles';
import api from '../../services/api';
import { logout } from '../../services/auth';
import { AssistanceContext } from '../../store/AssistanceContext';
import { UserContext } from '../../store/UserContext';

export default function Dashboard({ history }) {
  const { studentAssistances, setStudentAssistances } = useContext(AssistanceContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function getUser() {
      const response = await api.get('/users/auth/getUser');
      setUser(response.data);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function fetchStudentAssistances() {
      const response = await api.get(`/user/assistances/student/${user.id}`);
      setStudentAssistances(response.data);
    }

    fetchStudentAssistances();
  }, [user.id]);

  function handleLogout() {
    logout();
    history.push('/');
  }

  return (
    <Box height="100vh" bgColor="#FAF6FF" isInline>
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
                  <MenuItem style={props} isSelected>
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

                  <MenuItem
                    style={props}
                    onClick={() => {
                      history.push('/assistances');
                    }}
                  >
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
      <Box width="100%">
        <SubTitle marginTop="45px" marginBottom="20px">
          Dashboard
        </SubTitle>
        <Container marginBottom="50px" width="100%" height="150px">
          <CardContainer padding="36px" marginRight bgColor="#FFF" gridColumn="1/5">
            <h3>ATENDIMENTOS REALIZADOS</h3>
            <Title>
              {
                studentAssistances.filter(assistance => {
                  return assistance.status_id === 2;
                }).length
              }
            </Title>
          </CardContainer>
          <CardContainer padding="36px" bgColor="#FFF" gridColumn="5/9">
            <h3>ATENDIMENTOS CANCELADOS</h3>
            <Title>
              {
                studentAssistances.filter(assistance => {
                  return assistance.status_id === 3 || assistance.status_id === 4;
                }).length
              }
            </Title>
          </CardContainer>
        </Container>
        <Container width="100%" height="150px">
          <CardContainer padding="36px" marginRight bgColor="#FFF" gridColumn="1/9">
            <h3>MEUS ATENDIMENTOS</h3>
            <Box marginTop="10px">
              {studentAssistances.length !== 0 ? (
                studentAssistances.map(assistance => (
                  <Box marginBottom="15px">
                    <p>
                      <strong>Assunto: </strong>
                      {assistance.subjectMatter.subject_matter_description}
                    </p>
                    <p>
                      <strong>Monitor: </strong>
                      {assistance.tutor_name}
                    </p>
                    <p>
                      <Status statusId={assistance.status_id} assistanceId={assistance.id} />
                    </p>
                    {assistance.status_id === 2 && (
                      <Button
                        marginTop="15px"
                        onClick={() => {
                          localStorage.setItem('assistance_id', assistance.id);
                          localStorage.setItem('tutor_id', assistance.tutor_id);
                          localStorage.setItem('subject_matter_id', assistance.subject_matter_id);
                          localStorage.setItem('commentable', true);
                          history.push('/comments');
                        }}
                      >
                        <MdChatBubbleOutline /> Comentar
                      </Button>
                    )}
                  </Box>
                ))
              ) : (
                <Box>
                  <span>
                    Você ainda não realizou nenhum atendimento, que tal{' '}
                    <SmallLink
                      color="#B276FF"
                      fontWeight="700"
                      onClick={() => {
                        history.push('/search-tutors');
                      }}
                    >
                      marcar um agora?
                    </SmallLink>
                  </span>
                </Box>
              )}
            </Box>
          </CardContainer>
        </Container>
      </Box>
    </Box>
  );
}
