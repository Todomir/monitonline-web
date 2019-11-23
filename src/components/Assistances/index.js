import React from 'react';
import dateFormat from 'dateformat';
import { SmallLink } from '../styled-components/styles';

export default function Assistances({ assistances }) {
  const status = id => {
    switch (id) {
      case 1:
        return 'Marcado';
        break;
      case 2:
        return 'Realizado';
        break;
      case 3:
        return 'Cancelado pelo aluno';
        break;
      case 4:
        return 'Cancelado pelo monitor';
        break;
      default:
        return '404';
    }
  };

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
      <ul>
        <strong>Status: </strong> {status(assistance.status_id)}
      </ul>
      {}
      <br />
    </>
  ));
}
