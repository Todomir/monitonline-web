import React, { useState, useEffect } from 'react';
import { Spring } from 'react-spring/renderprops';

import './styles.css';

import Nav from '../../components/Nav';
import {
  Container,
  CardContainer,
  Box,
  Paragraph,
  SubTitle,
  Button
} from '../../components/styled-components/styles';
import SubjectList from '../../components/SubjectList';
import api from '../../services/api';

export default function SearchTutor({ history }) {
  const [smId, setSmId] = useState(0);
  const [subjectMatter, setSubjectMatter] = useState({});

  localStorage.setItem('subject_matter_description', subjectMatter.subject_matter_description);

  function subjectMattersCallback(id) {
    setSmId(id);
  }

  useEffect(() => {
    async function getSubjectMatter() {
      const response = await api.get(`/subjectmatters/${smId}`);
      setSubjectMatter(response.data);
    }
    getSubjectMatter();
  }, [smId]);

  return (
    <>
      <Nav isLight />
      <Container height="100%">
        <Box marginTop="141px" alignItems="center" gridColumn="2/12">
          <CardContainer padding="85px 100px" width="100%">
            <SubTitle>O processo é bastante simples.</SubTitle>
            <Paragraph>
              Basta você selecionar a disciplina que você deseja tutoria, em seguida o assunto.
              <br />
              Nós assumimos daí. ;)
            </Paragraph>

            <Spring from={{ opacity: 0, height: 0 }} to={{ opacity: 1, height: 400 }} delay={100}>
              {props => (
                <Box style={props} marginBottom="30px">
                  <SubjectList toggle callback={subjectMattersCallback} />
                </Box>
              )}
            </Spring>
            <Button
              type="submit"
              onClick={() => {
                history.push('/tutors');
              }}
            >
              Pesquisar monitor
            </Button>
          </CardContainer>
        </Box>
      </Container>
    </>
  );
}
