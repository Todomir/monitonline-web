import React, { useState } from 'react';
import api from '../../services/api';

import SubjectList from '../../components/SubjectList';
import {
  RadioButton,
  Button,
  FormLabel,
  TextInput,
  Select,
  Title,
  FlexWrapper
} from '../../components/styled-components/styles';

export default function Register({ history }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState(0);
  const [is_tutor, setTutor] = useState(false);
  const [subject_matters, setSubjectMatters] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post('/users', {
        name,
        email,
        cpf,
        password,
        course,
        is_tutor,
        subject_matters
      });

      history.push('/');
    } catch (err) {
      console.log(err.response);
    }
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
      <Title>MONITONLINE | CADASTRO</Title>

      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor="name">NOME COMPLETO *</FormLabel>
        <TextInput
          type="text"
          name="name"
          id="name"
          placeholder="Seu belo nome"
          onChange={event => setName(event.target.value)}
          required
        />
        <FormLabel htmlFor="cpf">CPF *</FormLabel>
        <TextInput
          type="text"
          name="cpf"
          id="cpf"
          placeholder="Seu CPF"
          onChange={event => setCpf(event.target.value)}
          required
        />
        <FormLabel htmlFor="email">E-MAIL *</FormLabel>
        <TextInput
          type="email"
          name="email"
          id="email"
          placeholder="Seu melhor e-mail"
          onChange={event => setEmail(event.target.value)}
          required
        />
        <FormLabel htmlFor="password">SENHA *</FormLabel>
        <TextInput
          type="password"
          name="password"
          id="password"
          onChange={event => setPassword(event.target.value)}
          required
        />
        <FormLabel htmlFor="course">CURSO *</FormLabel>
        <Select
          name="course"
          id="course"
          value={course}
          onChange={event => setCourse(parseInt(event.target.value))}
        >
          <option value="0">Eletromecânica</option>
          <option value="1">Tecnologia da Informação</option>
        </Select>
        <FormLabel>DESEJA SER MONITOR? *</FormLabel>

        <FlexWrapper isInline marginLeft="-30px" marginTop="7px">
          <label>
            <RadioButton
              type="radio"
              name="is_tutor"
              value="true"
              onChange={event => setTutor(handleRadio(event.target.value))}
            />
            Sim
          </label>

          <label>
            <RadioButton
              type="radio"
              name="is_tutor"
              value="false"
              onChange={event => setTutor(handleRadio(event.target.value))}
            />
            Não
          </label>
        </FlexWrapper>

        <SubjectList isTutor={is_tutor} callback={subjectMattersCallback} />

        <Button type="submit">Cadastre-se</Button>
      </form>
    </>
  );
}
