import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';

import Nav from '../../components/Nav';
import SubjectList from '../../components/SubjectList';

import api from '../../services/api';

import {
  Container,
  CardContainer,
  Box,
  Form,
  FormLabel,
  TextInput,
  Select,
  RadioButton,
  Button
} from '../../components/styled-components/styles';

export default function ContinueRegister({ history }) {
  const {
    email,
    password,
    name,
    setName,
    cpf,
    setCpf,
    course,
    setCourse,
    is_tutor,
    setTutor,
    subjectMatters,
    setSubjectMatters
  } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    await api.post('/users', {
      name,
      cpf,
      email,
      password,
      course,
      is_tutor,
      subject_matters: subjectMatters
    });
    history.push('/login');
  }

  function handleRadio(value) {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return value;
  }

  function subjectMattersCallback(subjectMattersId) {
    setSubjectMatters(subjectMattersId);
  }

  return (
    <>
      <Nav isLight />
      <Container height="100%">
        <Box marginTop="141px" alignItems="center" gridColumn="2/12">
          <CardContainer padding="85px 100px" width="100%">
            <Form onSubmit={handleSubmit} width="75%">
              <FormLabel>Nome completo *</FormLabel>
              <TextInput
                type="name"
                name="name"
                id="name"
                placeholder="John Doe"
                onChange={event => setName(event.target.value)}
              />
              <FormLabel>CPF *</FormLabel>
              <TextInput
                type="cpf"
                name="cpf"
                id="cpf"
                placeholder="000.000.000-00"
                onChange={event => setCpf(event.target.value)}
              />
              <FormLabel>Curso *</FormLabel>
              <Select
                type="course"
                name="course"
                id="course"
                placeholder="Selecione um curso"
                onChange={event => setCourse(parseInt(event.target.value))}
              >
                <option value="1">Tecnologia da Informação</option>
                <option value="2">Eletromecânica</option>
              </Select>
              <FormLabel>Deseja ser monitor? *</FormLabel>
              <Box isInline>
                <RadioButton
                  type="radio"
                  name="is_tutor"
                  value="true"
                  onChange={event => setTutor(handleRadio(event.target.value))}
                />{' '}
                Sim
                <RadioButton
                  type="radio"
                  name="is_tutor"
                  value="false"
                  onChange={event => setTutor(handleRadio(event.target.value))}
                />{' '}
                Não
              </Box>
              <Box marginBottom="30px">
                <SubjectList isTutor={is_tutor} callback={subjectMattersCallback} />
              </Box>
              <Button type="submit">Cadastrar</Button>
            </Form>
          </CardContainer>
        </Box>
      </Container>
    </>
  );
}
