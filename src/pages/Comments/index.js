import React, { useState, useEffect } from 'react';

import { TextSmall, Button, FormLabel } from '../../components/styled-components/styles';
import api from '../../services/api';

export default function Comments() {
  const assistanceId = localStorage.getItem('assistance_id');
  const tutorId = localStorage.getItem('tutor_id');
  const subjectMatterId = localStorage.getItem('subject_matter_id');
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchComments() {
      const response = await api.post(`comments/subject-matter/${subjectMatterId}`, {
        tutor_id: tutorId
      });
      setComments(response.data);
    }
    fetchComments();
  }, []);

  async function handleComment(event) {
    event.preventDefault();
    await api.post(`/comments/${assistanceId}`, { content });
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
