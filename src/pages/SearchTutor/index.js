import React, { useState } from 'react';

import { MdSearch, MdAssignment } from 'react-icons/md';

import api from '../../services/api';

import './styles.css';

import Modal from '../../components/Modal';
import {
  CardContainer,
  CardContent,
  FormLabel,
  TextInput,
  SmallLink,
  SubTitle,
  Button
} from '../../components/styled-components/styles';

export default function SearchTutor({ history }) {
  const [subject_matter_description, setSMDescription] = useState('');
  const [toggle, setToggle] = useState(false);
  const [tutors, setTutors] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/users/fetchUsersByDescription', {
        subject_matter_description
      });
      setTutors(response.data);
    } catch (err) {
      console.log(err.response);
    }
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
      <h1>MONITONLINE | TUTORIA</h1>

      <CardContainer>
        <CardContent>
          <h2>Pesquisar tutores</h2>

          <form onSubmit={handleSubmit}>
            <FormLabel htmlFor="subject_matter_description">
              digite o assunto que deseja tutoria *
            </FormLabel>
            <div className="search-input">
              <TextInput
                type="text"
                name="subject_matter_description"
                placeholder="Trigonometria"
                value={subject_matter_description}
                onChange={event => setSMDescription(event.target.value)}
              />
              <button onClick={handleToggle} type="submit">
                <MdSearch />
              </button>
            </div>
          </form>
        </CardContent>
      </CardContainer>

      <Modal toggle={toggle}>
        <SubTitle>Monitores</SubTitle>
        {tutors.map(tutor => (
          <>
            <FormLabel key={tutor.name}>{tutor.name}</FormLabel>

            <SmallLink
              key={tutor.id}
              onClick={() => {
                handleAssistanceClick(
                  tutor.id,
                  tutor.subjectMatters.find(subjectMatter => {
                    if (subjectMatter.subject_matter_description === subject_matter_description)
                      return subjectMatter;
                  })
                );
              }}
            >
              <MdAssignment key={tutor.id} /> ver horários disponíveis
            </SmallLink>
          </>
        ))}
        <Button onClick={handleToggle}>voltar</Button>
      </Modal>
    </>
  );
}
