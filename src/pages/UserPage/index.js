import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { getToken } from '../../services/auth';

import './styles.css';

export default function UserPage() {
  const [user, setUser] = useState({});
  const token = getToken();

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    async function getUser() {
      const response = await api.get('/users/auth/getUser');
      setUser(response.data);
    }
    getUser();
  }, []);

  if (user.is_tutor) {
    return (
      <>
        <h1>MONITONLINE </h1>
        <strong>
          <h5>{user.name}</h5>
        </strong>

        <div className="content-container">
          <div className="profile">
            <h2>Opções do monitor</h2>
            <label>checar atendimentos</label>
            <label>editar assuntos</label>
            <label>adicionar horário</label>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>MONITONLINE </h1>
        <strong>
          <p>{user.name}</p>
        </strong>
      </>
    );
  }
}
