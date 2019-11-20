import React from 'react';

import { StyledModal, ModalContainer } from '../styled-components/styles';

export default function Modal({ toggle, children }) {
  if (toggle) {
    return (
      <StyledModal>
        <ModalContainer>{children}</ModalContainer>
      </StyledModal>
    );
  }
  return null;
}
