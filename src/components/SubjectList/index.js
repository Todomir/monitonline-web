import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { Transition } from 'react-spring/renderprops';
import api from '../../services/api';

import './styles.css';
import ListItem from '../ListItem';

import { Box, AnimatedLabel } from '../styled-components/styles';

export default function SubjectList({ isTutor, callback }) {
  const [subjectMatters, setSubjectMatters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [subjectsId, setSubjectsId] = useState([]);
  const [subjectMattersId, setSubjectMattersId] = useState([]);

  const boxProps = useSpring({
    height: isTutor ? 310 : 0,
    opacity: isTutor ? 1 : 0
  });

  const labelProps = useSpring({
    opacity: isTutor ? 1 : 0
  });

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

  return (
    <Box isInline>
      <Box marginRight="120px">
        <AnimatedLabel style={labelProps}>Disciplinas</AnimatedLabel>
        <animated.div style={boxProps} className="subject-matter-list">
          <ul>
            {subjects.map(item => (
              <ListItem key={item.id} callback={handleSubjectCallback} item={item}>
                {item.subject_description}
              </ListItem>
            ))}
          </ul>
        </animated.div>
      </Box>

      <Box>
        <AnimatedLabel style={labelProps}>Assuntos</AnimatedLabel>
        <animated.div style={boxProps} className="subject-matter-list">
          <ul>
            <Transition
              items={subjectMatters}
              keys={subjectMatter => subjectMatter.id}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
              trail={100}
            >
              {item => props => (
                <label style={props}>
                  <ListItem callback={handleSubjectMattersCallback} item={item}>
                    {item.subject_matter_description}
                  </ListItem>
                </label>
              )}
            </Transition>
          </ul>
        </animated.div>
      </Box>
    </Box>
  );
}
