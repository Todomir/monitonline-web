import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { TextSmall, Button, FormLabel } from '../styled-components/styles';

export default function Comments() {
  const assistance = JSON.parse(localStorage.getItem('assistance'));
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchComments() {
      const response = await api.post(`comments/subject-matter/${assistance.subject_matter_id}`, {
        tutor_id: assistance.tutor_id
      });
      setComments(response.data);
    }
    fetchComments();
  }, []);

  async function handleComment(event) {
    event.preventDefault();
    await api.post(`/comments/${assistance.id}`, { content });
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
