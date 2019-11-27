import React, { useState, useContext, useEffect } from 'react';
import { AssistanceContext } from '../../store/AssistanceContext';

// import { Container } from './styles';

export default function Comments() {
  const { currentAssistance } = useContext(AssistanceContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(currentAssistance.comments);
  }, [currentAssistance]);

  return (
    <>
      {comments.map(comment => (
        <>
          <strong key={comment.user_id}>{comment.user.name}</strong>
          <ul key={comment.id}>{comment.content}</ul>
        </>
      ))}
    </>
  );
}
