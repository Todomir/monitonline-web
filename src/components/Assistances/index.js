import React from 'react';
import dateFormat from 'dateformat';

export default function Assistances({ assistances }) {
  return assistances.map(assistance => (
    <>
      <ul>
        <strong>Aluno: </strong>
        {assistance.student.name}
      </ul>

      <ul>
        <strong>Horário: </strong>
        De {dateFormat(assistance.schedule.schedule_start, 'dd-mm-yyyy HH:MM')} à{' '}
        {dateFormat(assistance.schedule.schedule_end, 'dd-mm-yyyy HH:MM')}
      </ul>
      <br />
    </>
  ));
}
