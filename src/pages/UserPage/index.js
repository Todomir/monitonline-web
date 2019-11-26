import React, { useState, useEffect, useContext } from 'react';

import dateFormat from 'dateformat';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { MdDateRange, MdBook, MdQueryBuilder, MdAddAlarm } from 'react-icons/md';
import api from '../../services/api';

import { UserContext } from '../../store/UserContext';
import { AssistanceContext } from '../../store/AssistanceContext';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import StudentOptions from '../../components/StudentOptions';
import ToggleContainer from '../../components/ToggleContainer';
import {
  Title,
  SubTitle,
  SmallLink,
  StyledLink,
  Calendar,
  CardContainer,
  CardContent,
  TextSmall
} from '../../components/styled-components/styles';
import Assistances from '../../components/Assistances';

export default function UserPage() {
  const [schedules, setSchedules] = useState([]);

  const { tutorAssistances, setTutorAssistances, setStudentAssistances } = useContext(
    AssistanceContext
  );

  const { setUser, id, name, isTutor } = useContext(UserContext);

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

  if (isTutor) {
    return (
      <>
        <Title>MONITONLINE | PERFIL</Title>

        <CardContainer>
          <CardContent>
            <SubTitle marginBottom="7px">Opções do monitor</SubTitle>
            <TextSmall marginBottom="20px">{name}</TextSmall>

            <StyledLink onClick={handleAssistanceClick}>
              <MdDateRange /> checar atendimentos
            </StyledLink>

            <ToggleContainer toggle={assistanceToggle}>
              <SubTitle marginTop="20px">Meus atendimentos</SubTitle>
              <TextSmall marginBottom="20px">{name}</TextSmall>
              {tutorAssistances.map(assistance => (
                <TextSmall>
                  <Assistances assistance={assistance} name={assistance.student.name} />
                </TextSmall>
              ))}
            </ToggleContainer>

            <SmallLink onClick={handleScheduleClick}>
              <MdQueryBuilder /> checar horarios
            </SmallLink>

            <ToggleContainer toggle={scheduleToggle}>
              <Calendar>
                <FullCalendar
                  defaultView="dayGridMonth"
                  plugins={[dayGridPlugin]}
                  locale="pt-br"
                  events={events}
                  eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false
                  }}
                />
              </Calendar>
            </ToggleContainer>

            <StyledLink to="/">
              <MdBook /> editar assuntos
            </StyledLink>

            <StyledLink to="/add-schedules">
              <MdAddAlarm /> adicionar horário
            </StyledLink>
          </CardContent>
        </CardContainer>

        <StudentOptions />
      </>
    );
  }
  return (
    <>
      <Title>MONITONLINE | PERFIL</Title>
      <StudentOptions />
    </>
  );
}
