import React from 'react';
import { NavBar, NavLink } from '../styled-components/styles';

export default function Nav({ isLight }) {
  return (
    <NavBar light={isLight}>
      <span>
        <NavLink light={isLight} to="/">
          <strong>Monitonline</strong>
        </NavLink>
      </span>

      <span>
        <NavLink light={isLight} to="/login">
          Fazer login
        </NavLink>
        <NavLink light={isLight} to="/register">
          Cadastre-se
        </NavLink>
      </span>
    </NavBar>
  );
}
