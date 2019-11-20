import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

export default function SubjectList({ isTutor, callback }) {
  const [subjectMatters, setSubjectMatters] = useState([]);
  const [subjectMattersId, setSubjectMattersId] = useState([]);

  useEffect(() => {
    callback(subjectMattersId);
  }, [subjectMattersId, callback]);

  useEffect(() => {
    async function fetchSubjectMatters() {
      try {
        const response = await api.get('/subjectmatters');
        setSubjectMatters(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchSubjectMatters();
  }, []);

  function handleCheckbox(event) {
    const value = parseInt(event.target.value);
    const isChecked = event.target.checked;
    let index;

    // check if the check box is checked or unchecked
    if (isChecked) {
      // add the numerical value of the checkbox to options array
      setSubjectMattersId(subjectMattersId => [...subjectMattersId, value]);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = subjectMattersId.indexOf(value);
      subjectMattersId.splice(index, 1);
      setSubjectMattersId([...subjectMattersId]);
    }
  }

  if (isTutor) {
    return (
      <div className="subject-matter-list">
        {subjectMatters.map(subjectMatter => (
          <label key={subjectMatter.id}>
            <input
              type="checkbox"
              name={subjectMatter.subject_matter_description}
              value={subjectMatter.id}
              onChange={handleCheckbox}
              key={subjectMatter.id}
            />
            {subjectMatter.subject_matter_description}
            <span>{subjectMatter.subject.subject_description}</span>
          </label>
        ))}
      </div>
    );
  }
  return null;
}
