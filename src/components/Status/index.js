import React, { useState } from 'react';

// import { Container } from './styles';

export default function Status({ statusId }) {
  const statusMessage = id => {
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
        break;
    }
  };

  const [status, setStatus] = useState(statusMessage(statusId));

  function setMessageUpdate() {
    setStatus('Atualizar');
  }

  function setMessageStatus() {
    setStatus(statusMessage(statusId));
  }

  return (
    <ul>
      <strong>Status: </strong>{' '}
      <label onMouseEnter={setMessageUpdate} onMouseLeave={setMessageStatus}>
        {status}
      </label>
    </ul>
  );
}
