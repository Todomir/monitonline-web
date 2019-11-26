import React, { useState, createContext } from 'react';

// import { Container } from './styles';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const { id, name, cpf, email, subjectMatters } = user;
  const isTutor = user.is_tutor;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        id,
        name,
        cpf,
        email,
        isTutor,
        subjectMatters
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
