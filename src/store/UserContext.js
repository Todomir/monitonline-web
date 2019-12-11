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
  const [course, setCourse] = useState(user.course);
  const [is_tutor, setTutor] = useState(user.is_tutor);
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
        course,
        setCourse,
        is_tutor,
        setTutor,
        subjectMatters,
        setSubjectMatters
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
