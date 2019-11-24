import React, { useState } from 'react';
import {
  StyledLink,
  SubTitle,
  TextSmall,
  Select,
  FlexWrapper,
  EditableButton
} from '../styled-components/styles';
import Modal from '../Modal';

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

  return (
    <>
      <ul>
        <strong>Status: </strong>{' '}
        <StyledLink
          onClick={handleToggle}
          onMouseEnter={setMessageUpdate}
          onMouseLeave={setMessageStatus}
        >
          {status}
        </StyledLink>
      </ul>

      <Modal toggle={toggle}>
        <SubTitle>Atualizar status</SubTitle>
        <TextSmall marginBottom="20px">Basta selecionar o novo status para o atendimento</TextSmall>
        <Select>
          <option value="1">Marcado</option>
          <option value="2">Realizado</option>
          <option value="3">Cancelado pelo aluno</option>
          <option value="4">Cancelado pelo monitor</option>
        </Select>
        <FlexWrapper isInline marginTop="40px">
          <EditableButton>Confirmar</EditableButton>
          <EditableButton>Cancelar</EditableButton>
        </FlexWrapper>
      </Modal>
    </>
  );
}
