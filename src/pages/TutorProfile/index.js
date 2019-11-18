import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import dateFormat from 'dateformat';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function TutorProfile() {
  const tutor_id = parseInt(localStorage.getItem('tutor_id'));
  const subject_matter_id = parseInt(
    localStorage.getItem('subject_matter_id')
  );
  const [tutor, setTutor] = useState({});
  const [schedules, setSchedules] = useState([]);

  const events = schedules.map(schedule => ({
    title: 'Horário Disponível',
    start: dateFormat(schedule.schedule_start, 'yyyy-mm-dd HH:MM'),
    end: dateFormat(schedule.schedule_end, 'yyyy-mm-dd HH:MM'),
    id: schedule.id
  }));

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

  async function handleScheduleClick(currentEvent) {
    await api.post(`/assistances/${tutor_id}`, {
      subject_matter_id,
      schedule_id: parseInt(currentEvent.event._def.publicId)
    });

    alert('atendimento marcado com sucesso');
  }

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
            eventClick={handleScheduleClick}
          />
        </div>
      </div>
    </div>
  );
}
