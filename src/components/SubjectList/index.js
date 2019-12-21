import React, { useState, useEffect, useContext } from 'react';
import { animated, useSpring } from 'react-spring';

import api from '../../services/api';

import './styles.css';

import { SubjectMatterContext } from '../../store/SubjectMatterContext';
import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';
import { Box, AnimatedLabel } from '../styled-components/styles';

export default function SubjectList({ toggle, multi }) {
  const [subjectMatters, setSubjectMatters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [subjectsId, setSubjectsId] = useState([]);

  const [subjectId, setSubjectId] = useState(0);

  const { setSM, subjectMatterId, setSubjectMatterId } = useContext(SubjectMatterContext);

  const boxProps = useSpring({
    height: toggle ? 310 : 0,
    opacity: toggle ? 1 : 0
  });

  const labelProps = useSpring({
    opacity: toggle ? 1 : 0
  });

  useEffect(() => {
    if (!toggle) {
      setSubjectsId([]);
      setSubjectMatterId([]);
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

  function handleMultiSubjectCallback(item, selected) {
    let index;

    if (selected) {
      setSubjectsId(subjectsId => [...subjectsId, item.id]);
    } else {
      index = subjectsId.indexOf(item.id);
      subjectsId.splice(index, 1);
      setSubjectsId([...subjectsId]);
    }
  }

  function handleMultiSubjectMattersCallback(item, selected) {
    let index;

    if (selected) {
      setSubjectMatterId(subjectMatterId => [...subjectMatterId, item.id]);
    } else {
      index = subjectMatterId.indexOf(item.id);
      subjectMatterId.splice(index, 1);
      setSubjectMatterId([...subjectMatterId]);
    }
  }

  function handleSubjectCallback(item, selected) {
    if (selected) {
      setSubjectId(item.id);
    } else {
      setSubjectId(null);
    }
  }

  function handleSubjectMattersCallback(item, selected) {
    if (selected) {
      setSubjectMatterId(item.id);
    } else {
      setSubjectMatterId(null);
    }

    setSM(item);
  }

  return (
    <Box isInline>
      <Box marginRight="120px">
        <AnimatedLabel style={labelProps}>Disciplinas</AnimatedLabel>
        <animated.div style={boxProps} className="subject-matter-list">
          {multi
            ? subjects.map(item => (
                <label key={item.id}>
                  <Checkbox
                    callback={handleMultiSubjectCallback}
                    name="group"
                    item={item}
                    text={item.subject_description}
                    value={item.id}
                  />
                </label>
              ))
            : subjects.map(item => (
                <label key={item.id}>
                  <RadioButton
                    callback={handleSubjectCallback}
                    name="group"
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
                <label key={item.id}>
                  <Checkbox
                    callback={handleMultiSubjectMattersCallback}
                    name="group"
                    item={item}
                    text={item.subject_matter_description}
                    value={item.id}
                  />
                </label>
              ))
            : subjectMatters.map(item => (
                <label key={item.id}>
                  <RadioButton
                    callback={handleSubjectMattersCallback}
                    name="group"
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
