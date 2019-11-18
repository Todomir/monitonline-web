import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import dateFormat from 'dateformat';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import {
  MdDateRange,
  MdBook,
  MdQueryBuilder,
  MdAddAlarm
} from 'react-icons/md';

import './styles.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import StudentOptions from '../../components/StudentOptions';
import ToggleContainer from '../../components/ToggleContainer';
import {
  Title,
  SubTitle,
  SmallLink,
  StyledLink,
  Calendar
} from '../../components/styled-components/styles';

export default function UserPage() {
  const [user, setUser] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [toggle, setToggle] = useState(false);

  const events = schedules.map(schedule => ({
    title: 'Atendimento',
    start: dateFormat(schedule.schedule_start, 'yyyy-mm-dd HH:MM'),
    end: dateFormat(schedule.schedule_end, 'yyyy-mm-dd HH:MM')
  }));

  const handleClick = () => {
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
  });

  if (user.is_tutor) {
    return (
      <>
        <Title>MONITONLINE | PERFIL</Title>

        <div className="content-container">
          <div className="profile">
            <SubTitle>Opções do monitor</SubTitle>
            <h5>{user.name}</h5>

            <StyledLink to={'/'}>
              <MdDateRange /> checar atendimentos
            </StyledLink>

            <SmallLink onClick={handleClick}>
              <MdQueryBuilder /> checar horarios
            </SmallLink>

            <ToggleContainer toggle={toggle}>
              <Calendar>
                <FullCalendar
                  defaultView="dayGridMonth"
                  plugins={[dayGridPlugin]}
                  locale="pt-br"
                  events={events}
                />
              </Calendar>
            </ToggleContainer>

            <StyledLink to={'/'}>
              <MdBook /> editar assuntos
            </StyledLink>

            <StyledLink to={'/add-schedules'}>
              <MdAddAlarm /> adicionar horário
            </StyledLink>
          </div>

          <div className="profile">
            <StudentOptions />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Title>MONITONLINE | PERFIL</Title>
        <div className="content-container">
          <div className="profile">
            <StudentOptions />
          </div>
        </div>
      </>
    );
  }
}
