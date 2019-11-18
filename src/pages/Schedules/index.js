import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import dateFormat from 'dateformat';

import api from '../../services/api';

import {
  CardContainer,
  CardContent,
  FormLabel,
  Title,
  SubTitle,
  Button
} from '../../components/styled-components/styles';

export default function Schedules({ history }) {
  const [schedule_start, setScheduleStart] = useState(new Date());
  const [schedule_end, setScheduleEnd] = useState(new Date());

  const handleStart = date => {
    setScheduleStart(date);
  };

  const handleEnd = date => {
    setScheduleEnd(date);
  };

  async function handleSubmit() {
    try {
      await api.post('/schedules', {
        schedule_start: dateFormat(
          schedule_start,
          'yyyy-mm-dd HH:MM'
        ),
        schedule_end: dateFormat(schedule_end, 'yyyy-mm-dd HH:MM')
      });

      history.push('/userpage');
    } catch (err) {
      console.log(err.response);
    }
  }

  return (
    <>
      <Title>MONITONLINE | HORÁRIOS</Title>

      <CardContainer>
        <CardContent>
          <SubTitle marginBottom="7px">
            Cadastrar um novo horário
          </SubTitle>
          <FormLabel>
            determine o horário de início do atendimento
          </FormLabel>
          <DateTimePicker
            onChange={handleStart}
            value={schedule_start}
          />

          <FormLabel>
            determine o horário de término do atendimento
          </FormLabel>
          <DateTimePicker onChange={handleEnd} value={schedule_end} />
        </CardContent>
      </CardContainer>

      <Button onClick={handleSubmit}>cadastrar</Button>
    </>
  );
}
