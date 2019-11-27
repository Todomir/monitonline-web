import React, { useState, useContext, useEffect } from 'react';
import { AssistanceContext } from '../../store/AssistanceContext';

import api from '../../services/api';

// import { Container } from './styles';

export default function Comments() {
  const { currentAssistance } = useContext(AssistanceContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const response = await api.get(`/comments/schedule/${currentAssistance.schedule_id}`);
      setComments(response.data);
    }
    fetchComments();
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
