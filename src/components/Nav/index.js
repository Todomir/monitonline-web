import React, { useContext } from 'react';

import { UserContext } from '../../store/UserContext';
import { NavBar, NavLink } from '../styled-components/styles';

export default function Nav({ isLight, isLogged }) {
  const { user } = useContext(UserContext);

  return (
    <NavBar light={isLight}>
      <span>
        <NavLink light={isLight} to="/">
          <strong>Monitonline</strong>
        </NavLink>
      </span>

      <span>
        {isLogged ? (
          <NavLink to="/user-profile">{user.name}</NavLink>
        ) : (
          <>
            <NavLink light={isLight} to="/login">
              Fazer login
            </NavLink>
            <NavLink light={isLight} to="/register">
              Cadastre-se
            </NavLink>
          </>
        )}
      </span>
    </NavBar>
  );
}
