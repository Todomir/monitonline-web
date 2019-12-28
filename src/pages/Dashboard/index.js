import React, { useState, useEffect, useContext } from 'react';
import {
  MdDashboard,
  MdAccessTime,
  MdChatBubbleOutline,
  MdPermIdentity,
  MdAssignmentInd,
  MdExitToApp
} from 'react-icons/md';
import { Spring } from 'react-spring/renderprops';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import dateFormat from 'dateformat';

import Status from '../../components/Status';
import api from '../../services/api';
import { logout } from '../../services/auth';
import { AssistanceContext } from '../../store/AssistanceContext';
import { UserContext } from '../../store/UserContext';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import {
  Box,
  MenuLogo,
  MenuItem,
  Container,
  Title,
  SubTitle,
  TextSmall,
  CardContainer
} from '../../components/styled-components/styles';

export default function Dashboard({ history }) {
  const [schedules, setSchedules] = useState([]);

  const {
    tutorAssistances,
    studentAssistances,
    setTutorAssistances,
    setStudentAssistances
  } = useContext(AssistanceContext);

  const { user, setUser } = useContext(UserContext);

  const [scheduleToggle, setScheduleToggle] = useState(false);
  const [assistanceToggle, setAssistanceToggle] = useState(false);

  const events = schedules.map(schedule => ({
    title: 'Atendimento',
    start: dateFormat(schedule.schedule_start, 'yyyy-mm-dd HH:MM-04:00'),
    end: dateFormat(schedule.schedule_end, 'yyyy-mm-dd HH:MM-04:00'),
    timezone: 'UTC',
    id: schedule.id
  }));

  const handleScheduleClick = () => {
    setScheduleToggle(!scheduleToggle);
  };

  const handleAssistanceClick = () => {
    setAssistanceToggle(!assistanceToggle);
  };

  useEffect(() => {
    async function getUser() {
      const response = await api.get('/users/auth/getUser');
      setUser(response.data);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function fetchSchedules() {
      const response = await api.get(`/users/schedules/${user.id}`);
      setSchedules(response.data);
    }

    fetchSchedules();
  }, [user.id]);

  useEffect(() => {
    async function fetchTutorAssistances() {
      const response = await api.get(`/user/assistances/tutor/${user.id}`);
      setTutorAssistances(response.data);
    }

    fetchTutorAssistances();
  }, [user.id]);

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
    <Box height="100%" bgColor="#FAF6FF" isInline>
      <Spring from={{ width: 0, opacity: 0 }} to={{ width: 256, opacity: 1 }}>
        {props => (
          <Box style={props} height="100%" width="256px" marginRight="75px" bgColor="#FFF" elevated>
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

                  <MenuItem style={props}>
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
      <Box width="100%" height="100%">
        <SubTitle marginTop="45px" marginBottom="20px">
          Dashboard
        </SubTitle>
        <Container marginBottom="50px" width="100%" height="150px">
          <CardContainer padding="36px" marginRight bgColor="#FFF" gridColumn="1/5">
            <h3>ATENDIMENTOS REALIZADOS</h3>
            <Title>14</Title>
          </CardContainer>
          <CardContainer padding="36px" bgColor="#FFF" gridColumn="5/9">
            <h3>ATENDIMENTOS CANCELADOS</h3>
            <Title>3</Title>
          </CardContainer>
        </Container>
        <Container width="100%" height="150px">
          <CardContainer padding="36px" marginRight bgColor="#FFF" gridColumn="1/9">
            <h3>MEUS ATENDIMENTOS</h3>

            {studentAssistances.map(assistance => (
              <Box marginTop="10px">
                <p>
                  <strong>Assunto: </strong>
                  {assistance.subjectMatter.subject_matter_description}
                </p>
                <p>
                  <strong>Monitor: </strong>
                  {assistance.name}
                </p>
                <p>
                  <Status statusId={assistance.status_id} assistanceId={assistance.id} />
                </p>
              </Box>
            ))}
          </CardContainer>
        </Container>
      </Box>
    </Box>
  );
}
