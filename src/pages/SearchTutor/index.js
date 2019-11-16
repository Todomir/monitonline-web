import React, { useState } from 'react';

import { MdSearch, MdAssignment } from 'react-icons/md';

import api from '../../services/api';
import { getToken } from '../../services/auth';

import './styles.css';

export default function SearchTutor() {
  const token = getToken();
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [subject_matter_description, setSMDescription] = useState('');
  const [tutors, setTutors] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post(
        '/users/fetchUsersByDescription',
        { subject_matter_description }
      );
      setTutors(response.data);
    } catch (err) {
      console.log(err.response);
    }
  }

  return (
    <>
      <h1>MONITONLINE | TUTORIA</h1>

      <div className="content-container">
        <div className="profile">
          <h2>Pesquisar tutores</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="subject_matter_description">
              digite o assunto que deseja tutoria *
            </label>
            <div className="search-input">
              <input
                type="text"
                name="subject_matter_description"
                placeholder="Trigonometria"
                value={subject_matter_description}
                onChange={event =>
                  setSMDescription(event.target.value)
                }
              />
              <button type="submit">
                <MdSearch />
              </button>
            </div>
          </form>

          <label className="tutor-label">
            {tutors.map(tutor => (
              <>
                <h4 key={tutor.name}>{tutor.name}</h4>
                <h5 key={tutor.id}>
                  <MdAssignment key={tutor.id} /> ver horários
                  disponíveis
                </h5>
              </>
            ))}
          </label>
        </div>
      </div>
    </>
  );
}
