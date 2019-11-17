import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { getToken } from '../../services/auth';

import dateFormat from 'dateformat';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function TutorProfile() {
  const tutor_id = parseInt(localStorage.getItem('tutor_id'));
  const [tutor, setTutor] = useState({});
  const [schedules, setSchedules] = useState([]);
  const token = getToken();

  const events = schedules.map(schedule => ({
    title: 'Horário Disponível',
    start: dateFormat(schedule.schedule_start, 'yyyy-mm-dd HH:MM'),
    end: dateFormat(schedule.schedule_end, 'yyyy-mm-dd HH:MM')
  }));

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    async function getUser() {
      const response = await api.get(`/users/${tutor_id}`);
      setTutor(response.data);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getSchedules() {
      const response = await api.get(`/users/schedules/${tutor_id}`);
      setSchedules(response.data);
    }
    getSchedules();
  }, []);

  return (
    <div className="content-container">
      <div className="profile">
        <h2>{tutor.name}</h2>
        <h5>Horários do tutor</h5>
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            locale="pt-br"
            events={events}
          />
        </div>
      </div>
    </div>
  );
}
