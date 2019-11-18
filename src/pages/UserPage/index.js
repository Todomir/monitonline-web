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
import { Link } from 'react-router-dom';

import './styles.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import StudentOptions from '../../components/StudentOptions';
import ToggleContainer from '../../components/ToggleContainer';

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
        <h1>MONITONLINE | PERFIL</h1>

        <div className="content-container">
          <div className="profile">
            <h2>Opções do monitor</h2>
            <h5>{user.name}</h5>

            <label className="btn-label">
              <Link to={'/'}>
                <MdDateRange /> checar atendimentos
              </Link>
            </label>
            <label onClick={handleClick} className="btn-label">
              <MdQueryBuilder /> checar horarios
            </label>

            <ToggleContainer toggle={toggle}>
              <div className="calendar">
                <FullCalendar
                  defaultView="dayGridMonth"
                  plugins={[dayGridPlugin]}
                  locale="pt-br"
                  events={events}
                />
              </div>
            </ToggleContainer>

            <label className="btn-label">
              <Link to={'/'}>
                <MdBook /> editar assuntos
              </Link>
            </label>
            <label className="btn-label">
              <Link to={'/add-schedules'}>
                <MdAddAlarm /> adicionar horário
              </Link>
            </label>
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
        <h1>MONITONLINE </h1>
        <div className="content-container">
          <div className="profile">
            <StudentOptions />
          </div>
        </div>
      </>
    );
  }
}
