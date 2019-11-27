import React, { createContext, useState } from 'react';

// import { Container } from './styles';

export const CommentContext = createContext();

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);

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
