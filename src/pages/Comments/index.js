import React, { useState, useEffect } from 'react';
import { IoIosReturnLeft } from 'react-icons/io';
import { MdDashboard, MdChatBubble } from 'react-icons/md';

import Nav from '../../components/Nav';
import './styles.css';

import {
  Form,
  StyledLink,
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

  console.log(comments);

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
          <StyledLink color="#000" to="/user-profile">
            <IoIosReturnLeft /> Voltar ao dashboard
          </StyledLink>
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
            <Form onSubmit={handleComment}>
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
