import React from 'react';

import { MdDateRange } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function StudentOptions() {
  return (
    <>
      <h2>Opções do aluno</h2>

      <label className="btn-label">
        <Link to={'/search-tutors'}>
          <MdDateRange /> marcar atendimento
          <p>clique aqui para procurar um monitor agora mesmo!</p>
        </Link>
      </label>

      <label className="btn-label">
        <MdDateRange /> meus atendimentos
        <p>clique aqui para ver o status dos atendimentos marcados</p>
      </label>
    </>
  );
}
