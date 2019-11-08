import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { getToken } from '../../services/auth';

import { MdDateRange, MdBook, MdQueryBuilder } from 'react-icons/md';
import { Link } from 'react-router-dom';

import './styles.css';

import StudentOptions from '../../components/StudentOptions';

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
        <h1>MONITONLINE | PERFIL</h1>

        <div className="content-container">
          <div className="profile">
            <h2>Opções do monitor</h2>
            <h5>{user.name}</h5>

            <label>
              <Link to={'/'}>
                <MdDateRange /> checar atendimentos
              </Link>
            </label>
            <label>
              <Link to={'/'}>
                <MdBook /> editar assuntos
              </Link>
            </label>
            <label>
              <Link to={'/add-schedules'}>
                <MdQueryBuilder /> adicionar horário
              </Link>
            </label>

            <StudentOptions />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>MONITONLINE </h1>
        <div className="profile">
          <StudentOptions />
        </div>
      </>
    );
  }
}
