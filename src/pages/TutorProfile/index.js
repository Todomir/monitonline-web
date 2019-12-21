import React, { useState, useEffect } from 'react';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import dateFormat from 'dateformat';

import Modal from '../../components/Modal';
import {
  CardContainer,
  CardContent,
  SubTitle,
  TextSmall,
  Calendar,
  EditableButton,
  FlexWrapper
} from '../../components/styled-components/styles';
import api from '../../services/api';

export default function TutorProfile() {
  const tutor_id = parseInt(localStorage.getItem('tutor_id'));
  const subject_matter_id = parseInt(localStorage.getItem('subject_matter_id'));
  const [tutor, setTutor] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [scheduleId, setScheduleId] = useState([]);
  const [toggle, setToggle] = useState(false);

  const events = schedules.map(schedule => ({
    title: 'Horário Disponível',
    start: dateFormat(schedule.schedule_start, 'yyyy-mm-dd HH:MM-04:00'),
    end: dateFormat(schedule.schedule_end, 'yyyy-mm-dd HH:MM-04:00'),
    timezone: 'UTC',
    id: schedule.id
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

  function handleScheduleClick() {
    setToggle(!toggle);
  }

  async function handleConfirmAssistance() {
    await api.post(`/assistances/${tutor_id}`, {
      subject_matter_id,
      schedule_id: scheduleId
    });
    alert('Atendimento realizado com sucesso!');
    setToggle(!toggle);
  }

  return (
    <>
      <Modal toggle={toggle}>
        <SubTitle marginBottom="7px">Confirmação de atendimento</SubTitle>
        Tem certeza que deseja solicitar um atendimento com {tutor.name}?
        <FlexWrapper isInline marginTop="40px">
          <EditableButton width="200px" onClick={handleConfirmAssistance}>
            Sim
          </EditableButton>
          <EditableButton width="200px" onClick={handleScheduleClick}>
            Não
          </EditableButton>
        </FlexWrapper>
      </Modal>

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
              eventClick={currentEvent => {
                setScheduleId(parseInt(currentEvent.event._def.publicId));
                handleScheduleClick();
              }}
              eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false
              }}
            />
          </Calendar>
        </CardContent>
      </CardContainer>
    </>
  );
}
