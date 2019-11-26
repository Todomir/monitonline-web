import React, { useState, createContext } from 'react';

// import { Container } from './styles';

export const AssistanceContext = createContext();

export function AssistanceProvider({ children }) {
  const [studentAssistance, setStudentAssistance] = useState([]);
  const [tutorAssistance, setTutorAssistance] = useState([]);

  return (
    <AssistanceContext.Provider
      value={{ studentAssistance, setStudentAssistance, tutorAssistance, setTutorAssistance }}
    >
      {children}
    </AssistanceContext.Provider>
  );
}
