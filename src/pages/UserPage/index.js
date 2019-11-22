import React, { useState, useEffect } from 'react';

import dateFormat from 'dateformat';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { MdDateRange, MdBook, MdQueryBuilder, MdAddAlarm } from 'react-icons/md';
import api from '../../services/api';

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

export default function UserPage() {
  const [user, setUser] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [assistances, setAssistances] = useState([]);
  const [toggle, setToggle] = useState(false);

  const events = schedules.map(schedule => ({
    title: 'Atendimento',
    start: dateFormat(schedule.schedule_start, 'yyyy-mm-dd HH:MM-04:00'),
    end: dateFormat(schedule.schedule_end, 'yyyy-mm-dd HH:MM-04:00'),
    timezone: 'UTC',
    id: schedule.id
  }));

  const handleScheduleClick = () => {
    setToggle(!toggle);
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
    async function fetchAssistances() {
      const response = await api.get(`/users/assistances/${user.id}`);
      setAssistances(response.data);
    }

    fetchAssistances();
  }, [user.id]);

  if (user.is_tutor) {
    return (
      <>
        <Title>MONITONLINE | PERFIL</Title>

        <CardContainer>
          <CardContent>
            <SubTitle marginBottom="7px">Opções do monitor</SubTitle>
            <TextSmall marginBottom="20px">{user.name}</TextSmall>

            <StyledLink to="/">
              <MdDateRange /> checar atendimentos
            </StyledLink>

            <SmallLink onClick={handleScheduleClick}>
              <MdQueryBuilder /> checar horarios
            </SmallLink>

            <ToggleContainer toggle={toggle}>
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

        <StudentOptions studentName={user.name} />
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
