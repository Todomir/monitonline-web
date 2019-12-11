import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

import Checkbox from '../Checkbox';

import { Box, FormLabel, TextSmall } from '../styled-components/styles';

export default function SubjectList({ isTutor, callback }) {
  const [subjectMatters, setSubjectMatters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [subjectMattersId, setSubjectMattersId] = useState([]);
  const [subjectsId, setSubjectsId] = useState([]);

  useEffect(() => {
    callback(subjectMattersId);
  }, [subjectMattersId, callback]);

  useEffect(() => {
    if (!isTutor) {
      setSubjectsId([]);
      setSubjectMattersId([]);
    }
  }, [isTutor]);

  useEffect(() => {
    async function fetchSubjects() {
      const response = await api.get('/subjects');
      setSubjects(response.data);
    }
    fetchSubjects();
  }, []);

  useEffect(() => {
    async function fetchSubjectMatters() {
      const response = await api.post('/subjects/subjectmatters', { subject_id: subjectsId });
      setSubjectMatters(response.data);
    }
    fetchSubjectMatters();
  }, [subjectsId]);

  function handleSubjectMatterClick(event) {
    const value = parseInt(event.target.value);
    const selected = event.target.checked;
    let index;

    // check if the check box is checked or unchecked
    if (selected) {
      // add the numerical value of the checkbox to options array
      setSubjectMattersId(subjectMattersId => [...subjectMattersId, value]);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = subjectMattersId.indexOf(value);
      subjectMattersId.splice(index, 1);
      setSubjectMattersId([...subjectMattersId]);
    }
  }

  function handleSubjectClick(event) {
    const value = parseInt(event.target.value);
    const selected = event.target.checked;
    let index;

    // check if the check box is checked or unchecked
    if (selected) {
      // add the numerical value of the checkbox to options array
      setSubjectsId(subjectsId => [...subjectsId, value]);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = subjectsId.indexOf(value);
      subjectsId.splice(index, 1);
      setSubjectsId([...subjectsId]);
    }
  }

  if (isTutor) {
    return (
      <Box isInline>
        <Box marginRight="120px">
          <FormLabel>Disciplinas</FormLabel>
          <div className="subject-matter-list">
            <ul>
              {subjects.map(subject => (
                <li htmlFor={subject.id} key={subject.id}>
                  <Checkbox value={subject.id} id={subject.id} onChange={handleSubjectClick} />
                  {subject.subject_description}
                </li>
              ))}
            </ul>
          </div>
        </Box>

        <Box>
          <FormLabel>Assuntos</FormLabel>
          <div className="subject-matter-list">
            <ul>
              {subjectMatters.map(subjectMatter => (
                <li htmlFor={subjectMatter.id} key={subjectMatter.id}>
                  <Checkbox
                    value={subjectMatter.id}
                    id={subjectMatter.id}
                    onChange={handleSubjectMatterClick}
                  />
                  {subjectMatter.subject_matter_description}
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Box>
    );
  }
  return null;
}
