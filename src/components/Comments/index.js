import React, { useState, useContext, useEffect } from 'react';
import { AssistanceContext } from '../../store/AssistanceContext';

import api from '../../services/api';
import { TextSmall, Button, FormLabel } from '../styled-components/styles';

// import { Container } from './styles';

export default function Comments() {
  const { currentAssistance } = useContext(AssistanceContext);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchComments() {
      const response = await api.get(
        `user/${currentAssistance.tutor_id}/comments/subject-matter/${currentAssistance.subject_matter_id}`
      );
      setComments(response.data);
    }
    fetchComments();
  }, [currentAssistance]);

  async function handleComment(event) {
    event.preventDefault();
    await api.post(`/comments/${currentAssistance.id}`, { content });
    window.location.reload(false);
  }

  return (
    <>
      {comments.map(comment => (
        <TextSmall key={comment.id}>
          <strong>{comment.user.name}</strong>
          <ul>{comment.content}</ul>
        </TextSmall>
      ))}

      <form onSubmit={handleComment}>
        <FormLabel htmlFor="comment">SEU COMENTÁRIO *</FormLabel>
        <textarea
          id="comment"
          name="comment"
          rows="5"
          cols="33"
          onChange={event => setContent(event.target.value)}
        />

        <Button type="submit">ENVIAR COMENTÁRIO</Button>
      </form>
    </>
  );
}
