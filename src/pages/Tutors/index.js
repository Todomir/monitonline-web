import React, { useState, useEffect } from 'react';
import { MdSearch, MdAssignment } from 'react-icons/md';

import './styles.css';

import Modal from '../../components/Modal';
import {
  CardContainer,
  CardContent,
  FormLabel,
  TextInput,
  SmallLink,
  SubTitle,
  Button,
  Box
} from '../../components/styled-components/styles';
import api from '../../services/api';

export default function Tutors() {
  const [tutors, setTutors] = useState([]);
  const smDescription = localStorage.getItem('subject_matter_description');

  useEffect(() => {
    async function getTutors() {
      try {
        const response = await api.post('/users/fetchUsersByDescription', {
          subject_matter_description: smDescription
        });
        setTutors(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getTutors();
  }, [tutors]);

  return (
    <Box>
      <SubTitle>
        MONITORES ENSINANDO{' '}
        <strong style={{ color: '#b276ff' }}>{smDescription.toUpperCase()}</strong>
      </SubTitle>
      {tutors.map(tutor => (
        <>
          <FormLabel key={tutor.name}>{tutor.name}</FormLabel>
          <MdAssignment key={tutor.id} /> ver horários disponíveis
        </>
      ))}
    </Box>
  );
}
