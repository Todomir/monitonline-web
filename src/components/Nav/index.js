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
      <div className="list">
        <span>
          <Link to="/">Fazer login</Link>
        </span>
        <span>
          <Link to="/">Cadastre-se</Link>
        </span>
      </div>
    </nav>
  );
}
