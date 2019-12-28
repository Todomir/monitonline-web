import React, { useState, useEffect, useContext } from 'react';
import DateTimePicker from 'react-datetime-picker';
import {
  MdDashboard,
  MdAccessTime,
  MdChatBubbleOutline,
  MdPermIdentity,
  MdAssignmentInd,
  MdExitToApp,
  MdAlarmAdd
} from 'react-icons/md';
import { Spring } from 'react-spring/renderprops';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { parseISO, formatISO } from 'date-fns';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import Modal from '../../components/Modal';
import {
  Box,
  MenuLogo,
  MenuItem,
  Container,
  Calendar,
  SubTitle,
  TextSmall,
  FormLabel,
  CardContainer,
  Button
} from '../../components/styled-components/styles';
import api from '../../services/api';
import { logout } from '../../services/auth';
import { UserContext } from '../../store/UserContext';

export default function Schedules({ history }) {
  const [schedules, setSchedules] = useState([]);
  const [modalToggle, setModalToggle] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const [schedule_start, setScheduleStart] = useState(new Date());
  const [schedule_end, setScheduleEnd] = useState(new Date());

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

  const events = schedules.map(schedule => ({
    title: 'Atendimento',
    start: parseISO(schedule.schedule_start),
    end: parseISO(schedule.schedule_end),
    timezone: 'UTC',
    id: schedule.id
  }));

  const handleStart = date => {
    setScheduleStart(date);
  };

  const handleEnd = date => {
    setScheduleEnd(date);
  };

  async function handleSubmit() {
    try {
      await api.post('/schedules', {
        schedule_start: formatISO(schedule_start),
        schedule_end: formatISO(schedule_end)
      });

      window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  }

  function handleLogout() {
    logout();
    history.push('/');
  }

  function handleToggle() {
    setModalToggle(!modalToggle);
  }

  return (
    <Box height="100%" bgColor="#FAF6FF" isInline>
      <Spring from={{ width: 0, opacity: 0 }} to={{ width: 256, opacity: 1 }}>
        {props => (
          <Box style={props} height="100%" width="256px" marginRight="75px" bgColor="#FFF" elevated>
            <Spring
              from={{ paddingRight: -10, opacity: 0 }}
              to={{ paddingRight: 0, opacity: 1 }}
              delay={500}
            >
              {props => (
                <>
                  <MenuLogo style={props}>Monitonline</MenuLogo>
                  <Box style={props} marginLeft="24px" marginBottom="40px" isInline>
                    <Box>
                      <TextSmall>{user.name}</TextSmall>
                      <TextSmall>{user.is_tutor ? 'Monitor(a)' : 'Aluno'}</TextSmall>
                    </Box>
                  </Box>
                  <MenuItem style={props}>
                    <MdDashboard /> Dashboard
                  </MenuItem>

                  <MenuItem style={props} isSelected>
                    <MdAccessTime /> Horários
                  </MenuItem>

                  <MenuItem style={props}>
                    <MdChatBubbleOutline /> Comentários
                  </MenuItem>

                  <MenuItem
                    style={props}
                    onClick={() => {
                      history.push('/search-tutors');
                    }}
                  >
                    <MdPermIdentity /> Procurar monitor
                  </MenuItem>

                  <MenuItem style={props}>
                    <MdAssignmentInd /> Atendimentos
                  </MenuItem>

                  <MenuItem style={props} onClick={handleLogout}>
                    <MdExitToApp /> Logout
                  </MenuItem>
                </>
              )}
            </Spring>
          </Box>
        )}
      </Spring>
      <Box width="100%" height="100%">
        <SubTitle marginTop="45px" marginBottom="20px">
          Horários
        </SubTitle>

        <Container width="100%" height="150px">
          <CardContainer padding="36px" marginRight bgColor="#FFF" gridColumn="1/9">
            <h3>MEUS HORÁRIOS</h3>

            <Calendar>
              <FullCalendar
                contentHeight={500}
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

            <Button type="submit" onClick={handleToggle}>
              <MdAlarmAdd /> Cadastrar novo horário
            </Button>
          </CardContainer>
        </Container>

        <Modal toggle={modalToggle}>
          <SubTitle marginBottom="7px">Novo horário</SubTitle>
          <FormLabel>Início do atendimento</FormLabel>
          <DateTimePicker onChange={handleStart} value={schedule_start} />

          <FormLabel>Término do atendimento</FormLabel>
          <DateTimePicker onChange={handleEnd} value={schedule_end} />

          <Box marginTop="45px" isInline>
            <Button onClick={handleSubmit}>
              <MdAlarmAdd /> Cadastrar horário
            </Button>
            <Button onClick={handleToggle}>Voltar</Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
