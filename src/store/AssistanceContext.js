import React, { useState, createContext } from 'react';

// import { Container } from './styles';

export const AssistanceContext = createContext();

export function AssistanceProvider({ children }) {
  const [studentAssistances, setStudentAssistances] = useState([]);
  const [tutorAssistances, setTutorAssistances] = useState([]);
  const [currentAssistance, setCurrentAssistance] = useState({});

  return (
    <AssistanceContext.Provider
      value={{
        studentAssistances,
        setStudentAssistances,
        tutorAssistances,
        setTutorAssistances,
        currentAssistance,
        setCurrentAssistance
      }}
    >
      {children}
    </AssistanceContext.Provider>
  );
}
