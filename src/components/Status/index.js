import React, { useState, useContext } from 'react';
import {
  StyledLink,
  SubTitle,
  TextSmall,
  Select,
  FlexWrapper,
  EditableButton
} from '../styled-components/styles';

import Modal from '../Modal';

import api from '../../services/api';

import { UserContext } from '../../store/UserContext';

// import { Container } from './styles';

export default function Status({ statusId, assistanceId }) {
  const { isTutor } = useContext(UserContext);
  const statusMessage = id => {
    switch (id) {
      case 1:
        return 'Marcado';

      case 2:
        return 'Realizado';

      case 3:
        return 'Cancelado pelo aluno';

      case 4:
        return 'Cancelado pelo monitor';

      default:
        return '404';
    }
  };

  const [status, setStatus] = useState(statusMessage(statusId));
  const [statusValue, setStatusValue] = useState(1);
  const [toggle, setToggle] = useState(false);

  function setMessageUpdate() {
    setStatus('Atualizar');
  }

  function setMessageStatus() {
    setStatus(statusMessage(statusId));
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  async function handleConfirm() {
    await api.put(`/assistances/${assistanceId}`, { status_id: statusValue });
    window.location.reload(false);
  }

  return (
    <>
      <label>
        <strong>Status: </strong>{' '}
        {isTutor ? (
          <StyledLink
            onClick={handleToggle}
            onMouseEnter={setMessageUpdate}
            onMouseLeave={setMessageStatus}
          >
            {status}
          </StyledLink>
        ) : (
          status
        )}
      </label>

      <Modal toggle={toggle}>
        <SubTitle>Atualizar status</SubTitle>
        <TextSmall marginBottom="20px">Basta selecionar o novo status para o atendimento</TextSmall>
        <Select name="status" onChange={event => setStatusValue(parseInt(event.target.value))}>
          <option value="1">Marcado</option>
          <option value="2">Realizado</option>
          <option value="3">Cancelado pelo aluno</option>
          <option value="4">Cancelado pelo monitor</option>
        </Select>
        <FlexWrapper isInline marginTop="40px">
          <EditableButton onClick={handleConfirm}>Confirmar</EditableButton>
          <EditableButton onClick={handleToggle}>Cancelar</EditableButton>
        </FlexWrapper>
      </Modal>
    </>
  );
}
