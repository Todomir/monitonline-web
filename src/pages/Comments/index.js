import React, { useState, useEffect } from 'react';
import { IoIosReturnLeft } from 'react-icons/io';
import { MdChatBubble } from 'react-icons/md';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import Nav from '../../components/Nav';
import './styles.css';

import {
  Form,
  SmallLink,
  SubTitle,
  Paragraph,
  Button,
  FormLabel,
  CardContainer,
  Box,
  Container
} from '../../components/styled-components/styles';
import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';

export default function Comments({ history }) {
  const assistanceId = localStorage.getItem('assistance_id');
  const tutorId = localStorage.getItem('tutor_id');
  const subjectMatterId = localStorage.getItem('subject_matter_id');
  const commentable = JSON.parse(localStorage.getItem('commentable'));

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [review, setReview] = useState(0);

  useEffect(() => {
    async function fetchComments() {
      const response = await api.post(`comments/subject-matter/${subjectMatterId}`, {
        tutor_id: tutorId
      });
      setComments(response.data);
    }
    fetchComments();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await api.post(`/comments/${assistanceId}`, { content });
    await api.post(`/assistances/${assistanceId}/reviews`, { review });
    window.location.reload(false);
  }

  function handleRating(event) {
    setReview(event.rating);
  }

  return (
    <>
      <Nav isLight isLogged={isAuthenticated()} />
      <Container>
        <CardContainer
          marginTop="90px"
          marginBottom="60px"
          bgColor="#fff"
          padding="40px"
          gridColumn="4/10"
        >
          <SmallLink
            onClick={() => {
              history.goBack();
            }}
            color="#000"
          >
            <IoIosReturnLeft /> Voltar à pagina anterior
          </SmallLink>
          <SubTitle marginTop="20px">Comentários</SubTitle>
          <Paragraph style={{ marginBottom: 20 }}>
            Esta é a seção de comentários. Por favor, mantenha as críticas construtivas.
          </Paragraph>
          {comments.length !== 0 ? (
            comments.map(comment => (
              <Box padding="10px" key={comment.id}>
                <strong>{comment.user.name}</strong>
                <div className="speech-bubble">
                  <span>{comment.content}</span>
                </div>
              </Box>
            ))
          ) : (
            <Box marginTop="20px" marginBottom="40px" marginLeft="20px">
              <Paragraph style={{ color: 'gray' }}>
                Nada por aqui ainda. Quem sabe um dia...
              </Paragraph>
            </Box>
          )}

          {commentable && (
            <Form style={{ marginTop: 30 }} onSubmit={handleSubmit}>
              <FormLabel>AVALIAÇÃO</FormLabel>
              <Rater onRate={handleRating} style={{ fontSize: 25 }} interactive total={5} />

              <FormLabel htmlFor="comment">SEU COMENTÁRIO *</FormLabel>
              <textarea
                id="comment"
                name="comment"
                rows="5"
                cols="33"
                onChange={event => setContent(event.target.value)}
              />

              <Button marginTop="20px" type="submit">
                <MdChatBubble /> COMENTAR
              </Button>
            </Form>
          )}
        </CardContainer>
      </Container>
    </>
  );
}
