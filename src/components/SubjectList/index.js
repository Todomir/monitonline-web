import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import styles from './styles.css';

// import { Container } from './styles';

export default function SubjectList(props) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function fetchSubjects() {
      const response = await api.get('/subjects');
      setSubjects(response.data);
    }

    fetchSubjects();
  });

  if (props.isTutor) {
    return (
      <div className="subject-list">
        {subjects.map(subject => (
          <>
            <label>
              <input
                type="checkbox"
                name={subject.subject_description}
                value={subject.id}
                key={subject.id}
              />
              {subject.subject_description}
            </label>
          </>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
