import React from 'react';

import { MdDateRange } from 'react-icons/md';

export default function StudentOptions() {
  return (
    <>
      <h2>Opções do aluno</h2>

      <label>
        <MdDateRange /> marcar atendimento
        <p>clique aqui para procurar um monitor agora mesmo!</p>
      </label>

      <label>
        <MdDateRange /> meus atendimentos
        <p>clique aqui para ver o status dos atendimentos marcados</p>
      </label>
    </>
  );
}
