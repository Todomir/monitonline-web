import React, { useState, useEffect, useContext } from 'react';

import dateFormat from 'dateformat';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import {
  MdDashboard,
  MdAccessTime,
  MdChatBubbleOutline,
  MdPermIdentity,
  MdAssignmentInd,
  MdExitToApp
} from 'react-icons/md';

import api from '../../services/api';
import { logout } from '../../services/auth';

import { UserContext } from '../../store/UserContext';
import { AssistanceContext } from '../../store/AssistanceContext';

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

  const { user, setUser, id, name, isTutor } = useContext(UserContext);

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
      const response = await api.get(`/users/schedules/${id}`);
      setSchedules(response.data);
    }

    fetchSchedules();
  }, [id]);

  useEffect(() => {
    async function fetchTutorAssistances() {
      const response = await api.get(`/user/assistances/tutor/${id}`);
      setTutorAssistances(response.data);
    }

    fetchTutorAssistances();
  }, [id]);

  useEffect(() => {
    async function fetchStudentAssistances() {
      const response = await api.get(`/user/assistances/student/${id}`);
      setStudentAssistances(response.data);
    }

    fetchStudentAssistances();
  }, [id]);

  function handleLogout() {
    logout();
    history.push('/');
  }

  return (
    <Box height="100%" bgColor="#FAF6FF" isInline>
      <Box height="100%" width="256px" marginRight="75px" bgColor="#FFF" elevated>
        <MenuLogo>Monitonline</MenuLogo>
        <Box>
          <TextSmall>{user.name}</TextSmall>
          <TextSmall>{user.is_tutor ? 'Monitor(a)' : 'Aluno'}</TextSmall>
        </Box>

        <MenuItem>
          <MdDashboard /> Dashboard
        </MenuItem>

        <MenuItem>
          <MdAccessTime /> Horários
        </MenuItem>

        <MenuItem>
          <MdChatBubbleOutline /> Comentários
        </MenuItem>

        <MenuItem>
          <MdPermIdentity /> Procurar monitor
        </MenuItem>

        <MenuItem>
          <MdAssignmentInd /> Atendimentos
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <MdExitToApp /> Logout
        </MenuItem>
      </Box>
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
              <h2>{assistance.id}</h2>
            ))}
          </CardContainer>
        </Container>
      </Box>
    </Box>
  );
}
