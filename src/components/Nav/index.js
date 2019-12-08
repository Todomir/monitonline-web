import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Nav() {
  return (
    <nav style={{ backgroundColor: '#B276FF' }}>
      <div className="logo">
        <Link to="/">
          <strong>Monitonline</strong>
        </Link>
      </div>

      <span className="login">
        <Link to="/">Fazer login</Link>
      </span>
      <span className="sign-up">
        <Link to="/">Cadastre-se</Link>
      </span>
    </nav>
  );
}
