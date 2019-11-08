import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { getToken } from '../../services/auth';

import { MdDateRange, MdBook, MdQueryBuilder } from 'react-icons/md';

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
        <h1>MONITONLINE | PERFIL</h1>

        <div className="content-container">
          <div className="profile">
            <h2>Opções do monitor</h2>
            <h5>{user.name}</h5>

            <label>
              <MdDateRange /> checar atendimentos
            </label>
            <label>
              <MdBook /> editar assuntos
            </label>
            <label>
              <MdQueryBuilder /> adicionar horário
            </label>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>MONITONLINE </h1>
        <div className="content-container">
          <div className="profile">
            <h2>Opções do aluno</h2>
            <h5>{user.name}</h5>

            <label>
              <MdDateRange /> marcar atendimento
              <p>clique aqui para procurar um monitor agora mesmo!</p>
            </label>

            <label>
              <MdDateRange /> meus atendimentos
              <p>
                clique aqui para ver o status dos atendimentos
                marcados
              </p>
            </label>
          </div>
        </div>
      </>
    );
  }
}
