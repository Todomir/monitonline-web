import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Nav({ light }) {
  if (light) {
    return (
      <nav>
        <div className="logo">
          <Link to="/" style={{ color: '#B276FF' }}>
            <strong>Monitonline</strong>
          </Link>
        </div>

        <span className="login">
          <Link to="/login" style={{ color: '#B276FF' }}>
            Fazer login
          </Link>
        </span>
        <span className="sign-up">
          <Link to="/register" style={{ color: '#B276FF' }}>
            Cadastre-se
          </Link>
        </span>
      </nav>
    );
  }
  return (
    <nav style={{ backgorundColor: '#B276FF' }}>
      <div className="logo">
        <Link to="/">
          <strong>Monitonline</strong>
        </Link>
      </div>

      <span className="login">
        <Link to="/login">Fazer login</Link>
      </span>
      <span className="sign-up">
        <Link to="/register">Cadastre-se</Link>
      </span>
    </nav>
  );
}
