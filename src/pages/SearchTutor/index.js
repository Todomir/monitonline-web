import React, { useState } from 'react';

import { MdSearch } from 'react-icons/md';

import api from '../../services/api';
import { getToken } from '../../services/auth';

import './styles.css';

export default function SearchTutor() {
  const token = getToken();
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [subject_matter_description, setSMDescription] = useState('');
  return (
    <>
      <h1>MONITONLINE | TUTORIA</h1>

      <div className="content-container">
        <div className="profile">
          <h2>Pesquisar tutores</h2>

          <form>
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
              <button>
                <MdSearch />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
