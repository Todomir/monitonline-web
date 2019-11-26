import React from 'react';
import dateFormat from 'dateformat';
import Status from '../Status';

export default function Assistances({ assistance, name }) {
  if (assistance) {
    return (
      <>
        <ul>
          <strong>Aluno: </strong>
          {name}
        </ul>

        <ul>
          <strong>Horário: </strong>
          De {dateFormat(assistance.schedule.schedule_start, 'dd-mm-yyyy HH:MM')} à{' '}
          {dateFormat(assistance.schedule.schedule_end, 'dd-mm-yyyy HH:MM')}
        </ul>

        <Status statusId={assistance.status_id} assistanceId={assistance.id} />

        <br />
      </>
    );
  }
  return <ul>Sem atendimentos aqui. :(</ul>;
}
