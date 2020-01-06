import React, { useState, useEffect, useContext } from 'react';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { parseISO } from 'date-fns';

import AssistancesBlock from '../../components/AssistancesBlock';
import Modal from '../../components/Modal';
import {
  Container,
  Paragraph,
  Title,
  Box,
  CardContainer,
  CardContent,
  SubTitle,
  TextSmall,
  Calendar,
  EditableButton,
  FlexWrapper
} from '../../components/styled-components/styles';
import api from '../../services/api';
import { AssistanceContext } from '../../store/AssistanceContext';

export default function TutorProfile() {
  const tutor_id = parseInt(localStorage.getItem('tutor_id'));
  const subject_matter_id = parseInt(localStorage.getItem('subject_matter_id'));
  const [tutor, setTutor] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [scheduleId, setScheduleId] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { tutorAssistances, setTutorAssistances } = useContext(AssistanceContext);

  useEffect(() => {
    async function fetchTutorAssistances() {
      const response = await api.get(`/user/assistances/tutor/${tutor_id}`);
      setTutorAssistances(response.data);
    }

    fetchTutorAssistances();
  }, [tutor_id]);

  const events = schedules.map(schedule => ({
    title: 'Horário Disponível',
    start: parseISO(schedule.schedule_start),
    end: parseISO(schedule.schedule_end),
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
      <Box width="100%" height="auto" marginBottom="90px">
        <Container marginBottom="50px" width="100%" height="150px">
          <CardContainer padding="36px" bgColor="#FFF" gridColumn="1/5">
            <h3 style={{ fontWeight: 400 }}>ATENDIMENTOS REALIZADOS</h3>
            <Title>
              {
                tutorAssistances.filter(assistance => {
                  return assistance.status_id === 2;
                }).length
              }
            </Title>
          </CardContainer>
        </Container>
        <Container width="100%">
          <CardContainer padding="36px" bgColor="#FFF" gridColumn="1/12">
            {tutorAssistances.length !== 0 ? (
              <AssistancesBlock />
            ) : (
              <Paragraph>Este monitor ainda não tem atendimentos marcados.</Paragraph>
            )}
          </CardContainer>
        </Container>
      </Box>

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
