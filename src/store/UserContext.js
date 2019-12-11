import React, { useState, createContext } from 'react';

// import { Container } from './styles';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [id, setId] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [cpf, setCpf] = useState(user.cpf);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [isTutor, setTutor] = useState(user.is_tutor);
  const [subjectMatters, setSubjectMatters] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        id,
        setId,
        name,
        setName,
        cpf,
        setCpf,
        email,
        setEmail,
        password,
        setPassword,
        isTutor,
        setTutor,
        subjectMatters,
        setSubjectMatters
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
