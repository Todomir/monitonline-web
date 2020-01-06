import React, { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';

import api from '../../services/api';
import { Box, TextSmall, Select, EditableButton } from '../styled-components/styles';
import ToggleContainer from '../ToggleContainer';

export default function Status({ statusId, assistanceId, isTutor }) {
  const statusMessage = id => {
    switch (id) {
      case 1:
        return <span style={{ color: '#B276FF' }}>Marcado</span>;

      case 2:
        return <span style={{ color: '#2FB63C' }}>Realizado</span>;

      case 3:
        return <span style={{ color: '#FA5959' }}>Cancelado pelo aluno</span>;

      case 4:
        return <span style={{ color: '#FA5959' }}>Cancelado pelo monitor</span>;

      default:
        return '404';
    }
  };

  const [status, setStatus] = useState(statusMessage(statusId));
  const [statusValue, setStatusValue] = useState(1);
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  async function handleConfirm() {
    await api.put(`/assistances/${assistanceId}`, { status_id: statusValue });
    window.location.reload(false);
  }

  return (
    <span>
      <strong>Status: </strong>{' '}
      {isTutor ? (
        <>
          <span>
            {status} <MdModeEdit style={{ cursor: 'pointer' }} onClick={handleToggle} />
          </span>

          <ToggleContainer toggle={toggle}>
            <Box
              elevated
              padding="15px"
              width="400px"
              marginTop="30px"
              marginBottom="30px"
              marginLeft="10px"
            >
              <h4>Atualizar status</h4>
              <TextSmall marginBottom="20px">
                Basta selecionar o novo status para o atendimento
              </TextSmall>
              <Select
                name="status"
                onChange={event => setStatusValue(parseInt(event.target.value))}
              >
                <option value="1">Marcado</option>
                <option value="2">Realizado</option>
                <option value="3">Cancelado pelo aluno</option>
                <option value="4">Cancelado pelo monitor</option>
              </Select>
              <Box isInline marginTop="40px">
                <EditableButton onClick={handleConfirm}>Confirmar</EditableButton>
                <EditableButton onClick={handleToggle}>Cancelar</EditableButton>
              </Box>
            </Box>
          </ToggleContainer>
        </>
      ) : (
        status
      )}
    </span>
  );
}
