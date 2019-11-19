import React from 'react';
import './styles.css';
// import { Container } from './styles';

export default function Modal({ toggle, children }) {
  if (toggle) {
    return (
      <div className="modal-bg">
        <div className="modal-main">{children}</div>
      </div>
    );
  } else {
    return null;
  }
}
