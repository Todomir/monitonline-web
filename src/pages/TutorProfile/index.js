import React, { useState, useEffect } from 'react';

import dateFormat from 'dateformat';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import api from '../../services/api';
import { CardContainer, CardContent, SubTitle, TextSmall, Calendar } from '../../components/styled-components/styles';

export default function TutorProfile() {
  const tutor_id = parseInt(localStorage.getItem('tutor_id'));
  const subject_matter_id = parseInt(localStorage.getItem('subject_matter_id'));
  const [tutor, setTutor] = useState({});
  const [schedules, setSchedules] = useState([]);

  const events = schedules.map(schedule => ({
    title: 'Horário Disponível',
    start: dateFormat(schedule.schedule_start, 'yyyy-mm-dd HH:MM'),
    end: dateFormat(schedule.schedule_end, 'yyyy-mm-dd HH:MM'),
    id: schedule.id,
  }));

  useEffect(() => {
    async function getUser() {
      const response = await api.get(`/users/${tutor_id}`);
      setTutor(response.data);
    }
    getUser();
  }, [tutor_id]);

  useEffect(() => {
    async function getSchedules() {
      const response = await api.get(`/users/schedules/${tutor_id}`);
      setSchedules(response.data);
    }
    getSchedules();
  }, [tutor_id]);

  async function handleScheduleClick(currentEvent) {
    await api.post(`/assistances/${tutor_id}`, {
      subject_matter_id,
      schedule_id: parseInt(currentEvent.event._def.publicId),
    });

    alert('atendimento marcado com sucesso');
  }

  return (
    <CardContainer>
      <CardContent>
        <SubTitle>{tutor.name}</SubTitle>
        <TextSmall>Horários do tutor</TextSmall>
        <Calendar>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            locale="pt-br"
            events={events}
            eventClick={handleScheduleClick}
          />
        </Calendar>
      </CardContent>
    </CardContainer>
  );
}
