import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import dateFormat from 'dateformat';

import api from '../../services/api';
import { getToken } from '../../services/auth';

import './styles.css';

export default function Schedules({ history }) {
  const token = getToken();
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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
      <h1>MONITONLINE | HORÁRIOS</h1>

      <div className="content-container">
        <div className="schedule-form">
          <label>determine o horário de início do atendimento</label>
          <DateTimePicker
            onChange={handleStart}
            value={schedule_start}
          />

          <label>determine o horário de término do atendimento</label>
          <DateTimePicker onChange={handleEnd} value={schedule_end} />
        </div>
      </div>

      <button className="btn" type="submit" onClick={handleSubmit}>
        cadastrar
      </button>
    </>
  );
}
