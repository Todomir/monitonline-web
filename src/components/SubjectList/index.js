import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import api from '../../services/api';

import './styles.css';

import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';

import { Box, AnimatedLabel } from '../styled-components/styles';

export default function SubjectList({ toggle, callback, multi }) {
  const [subjectMatters, setSubjectMatters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [subjectsId, setSubjectsId] = useState([]);
  const [subjectMattersId, setSubjectMattersId] = useState([]);

  const [subjectId, setSubjectId] = useState(0);
  const [subjectMatterId, setSubjectMatterId] = useState(0);

  const boxProps = useSpring({
    height: toggle ? 310 : 0,
    opacity: toggle ? 1 : 0
  });

  const labelProps = useSpring({
    opacity: toggle ? 1 : 0
  });

  useEffect(() => {
    callback(subjectMattersId);
  }, [subjectMattersId, callback]);

  useEffect(() => {
    if (!toggle) {
      setSubjectsId([]);
      setSubjectMattersId([]);
    }
  }, [toggle]);

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
        if (multi) {
          const response = await api.post('/subjects/subjectmatters', { subject_id: subjectsId });
          setSubjectMatters(response.data);
        } else {
          const response = await api.post('/subjects/subjectmatters', { subject_id: [subjectId] });
          setSubjectMatters(response.data);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchSubjectMatters();
  }, [subjectsId, subjectId]);

  function handleMultiSubjectCallback(id, selected) {
    let index;

    if (selected) {
      setSubjectsId(subjectsId => [...subjectsId, id]);
    } else {
      index = subjectsId.indexOf(id);
      subjectsId.splice(index, 1);
      setSubjectsId([...subjectsId]);
    }
  }
  function handleSubjectCallback(id, selected) {
    if (selected) {
      setSubjectId(id);
    } else {
      setSubjectId(null);
    }
  }

  function handleMultiSubjectMattersCallback(id, selected) {
    let index;

    if (selected) {
      setSubjectMattersId(subjectMattersId => [...subjectMattersId, id]);
    } else {
      index = subjectMattersId.indexOf(id);
      subjectMattersId.splice(index, 1);
      setSubjectMattersId([...subjectMattersId]);
    }
  }

  function handleSubjectMattersCallback(id, selected) {
    if (selected) {
      setSubjectMatterId(id);
    } else {
      setSubjectMatterId(null);
    }
  }

  return (
    <Box isInline>
      <Box marginRight="120px">
        <AnimatedLabel style={labelProps}>Disciplinas</AnimatedLabel>
        <animated.div style={boxProps} className="subject-matter-list">
          {multi
            ? subjects.map(item => (
                <label>
                  <Checkbox
                    callback={handleMultiSubjectCallback}
                    name="group"
                    key={item.id}
                    item={item}
                    text={item.subject_description}
                    value={item.id}
                  />
                </label>
              ))
            : subjects.map(item => (
                <label>
                  <RadioButton
                    callback={handleSubjectCallback}
                    name="group"
                    key={item.id}
                    item={item}
                    text={item.subject_description}
                    value={item.id}
                  />
                </label>
              ))}
        </animated.div>
      </Box>

      <Box>
        <AnimatedLabel style={labelProps}>Assuntos</AnimatedLabel>
        <animated.div style={boxProps} className="subject-matter-list">
          {multi
            ? subjectMatters.map(item => (
                <label>
                  <Checkbox
                    callback={handleMultiSubjectMattersCallback}
                    name="group"
                    key={item.id}
                    item={item}
                    text={item.subject_matter_description}
                    value={item.id}
                  />
                </label>
              ))
            : subjectMatters.map(item => (
                <label>
                  <RadioButton
                    callback={handleSubjectMattersCallback}
                    name="group"
                    key={item.id}
                    item={item}
                    text={item.subject_matter_description}
                    value={item.id}
                  />
                </label>
              ))}
        </animated.div>
      </Box>
    </Box>
  );
}
