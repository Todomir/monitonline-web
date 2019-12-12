import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';
import ListItem from '../ListItem';

import { Box, FormLabel } from '../styled-components/styles';

export default function SubjectList({ isTutor, callback }) {
  const [subjectMatters, setSubjectMatters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [subjectsId, setSubjectsId] = useState([]);
  const [subjectMattersId, setSubjectMattersId] = useState([]);

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
      try {
        const response = await api.post('/subjects/subjectmatters', { subject_id: subjectsId });
        setSubjectMatters(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchSubjectMatters();
  }, [subjectsId]);

  function handleSubjectCallback(id, selected) {
    let index;

    if (selected) {
      setSubjectsId(subjectsId => [...subjectsId, id]);
    } else {
      index = subjectsId.indexOf(id);
      subjectsId.splice(index, 1);
      setSubjectsId([...subjectsId]);
    }
  }

  function handleSubjectMattersCallback(id, selected) {
    let index;

    if (selected) {
      setSubjectMattersId(subjectMattersId => [...subjectMattersId, id]);
    } else {
      index = subjectMattersId.indexOf(id);
      subjectMattersId.splice(index, 1);
      setSubjectMattersId([...subjectMattersId]);
    }
  }

  if (isTutor) {
    return (
      <Box isInline>
        <Box marginRight="120px">
          <FormLabel>Disciplinas</FormLabel>
          <div className="subject-matter-list">
            <ul>
              {subjects.map(item => (
                <ListItem callback={handleSubjectCallback} key={item.id} item={item}>
                  {item.subject_description}
                </ListItem>
              ))}
            </ul>
          </div>
        </Box>

        <Box>
          <FormLabel>Assuntos</FormLabel>
          <div className="subject-matter-list">
            <ul>
              {subjectMatters.map(item => (
                <ListItem callback={handleSubjectMattersCallback} key={item.id} item={item}>
                  {item.subject_matter_description}
                </ListItem>
              ))}
            </ul>
          </div>
        </Box>
      </Box>
    );
  }
  return null;
}
