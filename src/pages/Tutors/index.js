import React, { useState, useEffect, useContext } from 'react';
import { MdAssignment } from 'react-icons/md';

import Nav from '../../components/Nav';
import {
  FormLabel,
  SubTitle,
  CardContainer,
  Button
} from '../../components/styled-components/styles';
import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';
import { SubjectMatterContext } from '../../store/SubjectMatterContext';

export default function Tutors({ history }) {
  const [tutors, setTutors] = useState([]);
  const { sm } = useContext(SubjectMatterContext);

  useEffect(() => {
    async function getTutors() {
      try {
        const response = await api.post('/users/fetchUsersByDescription', {
          subject_matter_description: sm.subject_matter_description
        });
        setTutors(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getTutors();
  }, [tutors]);

  function handleTutorClick(tutor) {
    localStorage.setItem('tutor_id', tutor.id);
    localStorage.setItem('subject_matter_id', sm.id);
    history.push('/schedule-assistance');
  }

  return (
    <>
      <Nav isLight isLogged={isAuthenticated()} />
      <CardContainer
        padding="60px 40px"
        marginTop="180px"
        marginBottom="225px"
        marginRight="auto"
        marginLeft="auto"
        width="900px"
      >
        <SubTitle>
          MONITORES ENSINANDO{' '}
          <strong style={{ color: '#b276ff' }}>
            {sm.subject_matter_description.toUpperCase()}
          </strong>
        </SubTitle>
        {tutors.map(tutor => (
          <>
            <FormLabel key={tutor.name}>{tutor.name}</FormLabel>
            <Button
              key={tutor.id}
              onClick={() => {
                handleTutorClick(tutor);
              }}
            >
              <MdAssignment /> Marcar atendimento
            </Button>
          </>
        ))}
      </CardContainer>
    </>
  );
}
