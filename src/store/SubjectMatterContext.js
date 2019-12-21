import React, { useState, createContext } from 'react';

export const SubjectMatterContext = createContext();

export function SubjectMatterProvider({ children }) {
  const [sm, setSM] = useState({});
  const [subjects, setSubjects] = useState({});
  const [subjectMatterId, setSubjectMatterId] = useState([]);

  return (
    <SubjectMatterContext.Provider
      value={{
        sm,
        setSM,
        subjects,
        setSubjects,
        subjectMatterId,
        setSubjectMatterId
      }}
    >
      {children}
    </SubjectMatterContext.Provider>
  );
}
