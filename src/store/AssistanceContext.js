import React, { useState, createContext } from 'react';

// import { Container } from './styles';

export const AssistanceContext = createContext();

export function AssistanceProvider({ children }) {
  const [studentAssistances, setStudentAssistances] = useState([]);
  const [tutorAssistances, setTutorAssistances] = useState([]);

  return (
    <AssistanceContext.Provider
      value={{ studentAssistances, setStudentAssistances, tutorAssistances, setTutorAssistances }}
    >
      {children}
    </AssistanceContext.Provider>
  );
}
