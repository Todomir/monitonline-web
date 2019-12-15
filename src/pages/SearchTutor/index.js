import React, { useState, useEffect } from 'react';
import { Spring } from 'react-spring/renderprops';

import api from '../../services/api';

import './styles.css';

import Nav from '../../components/Nav';
import SubjectList from '../../components/SubjectList';
import {
  Container,
  CardContainer,
  Box,
  FormLabel,
  TextInput,
  Paragraph,
  SubTitle,
  Button
} from '../../components/styled-components/styles';

export default function SearchTutor({ history }) {
  const [subjectMatters, setSubjectMatters] = useState('');
  const [subjects, setSubjects] = useState('');
  const [toggle, setToggle] = useState(false);
  const [tutors, setTutors] = useState([]);

  function subjectMattersCallback(subjectMattersId) {
    setSubjectMatters(subjectMattersId);
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  async function handleAssistanceClick(tutorId, subjectMatter) {
    const subjectMatterId = subjectMatter.id;
    localStorage.setItem('tutor_id', tutorId);
    localStorage.setItem('subject_matter_id', subjectMatterId);

    history.push('/schedule-assistance');
  }

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
            <Button type="submit">Pesquisar monitor</Button>
          </CardContainer>
        </Box>
      </Container>
    </>
  );
}
