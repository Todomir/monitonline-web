import React, { createContext, useContext, useState, useEffect } from 'react';
import { AssistanceContext } from './AssistanceContext';

// import { Container } from './styles';

export const CommentContext = createContext();

export function CommentProvider({ children }) {
  const { currentAssistance } = useContext(AssistanceContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(currentAssistance.comments);
  }, [currentAssistance]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}
