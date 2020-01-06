import React from 'react';
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
import { isAuthenticated } from '../../services/auth';

export default function SearchTutor({ history }) {
  return (
    <>
      <Nav isLight isLogged={isAuthenticated()} />
      <Container height="100%">
        <Box marginTop="141px" alignItems="center" gridColumn="2/12">
          <CardContainer bgColor="#fff" padding="85px 100px" width="100%">
            <SubTitle>O processo é bastante simples.</SubTitle>
            <Paragraph>
              Basta você selecionar a disciplina que você deseja tutoria, em seguida o assunto.
              <br />
              Nós assumimos daí. ;)
            </Paragraph>

            <Spring from={{ opacity: 0, height: 0 }} to={{ opacity: 1, height: 400 }} delay={100}>
              {props => (
                <Box style={props} marginBottom="30px">
                  <SubjectList toggle />
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
