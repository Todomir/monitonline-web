import React, { useState } from 'react';
import api from '../../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState(null);
  const [is_tutor, setTutor] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post('/users', {
        name,
        email,
        cpf,
        password,
        course,
        is_tutor
      });
    } catch (err) {
      console.log(err.response);
    }
  }

  function handleRadio(value) {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return value;
  }

  return (
    <>
      <h1>MONITONLINE | CADASTRO</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">NOME COMPLETO *</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Seu belo nome"
          onChange={event => setName(event.target.value)}
        />
        <label htmlFor="cpf">CPF *</label>
        <input
          type="text"
          name="cpf"
          id="cpf"
          placeholder="Seu CPF"
          onChange={event => setCpf(event.target.value)}
        />
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Seu melhor e-mail"
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor="password">SENHA *</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={event => setPassword(event.target.value)}
        />
        <label htmlFor="course">CURSO *</label>
        <select
          name="course"
          id="course"
          onChange={event => setCourse(parseInt(event.target.value))}
        >
          <option value="0">Eletromecânica</option>
          <option value="1">Tecnologia da Informação</option>
        </select>
        <label htmlFor="is_tutor">DESEJA SER MONITOR? *</label>

        <div className="radio-inline">
          <label>
            <input
              type="radio"
              name="is_tutor"
              value="true"
              onChange={event =>
                setTutor(handleRadio(event.target.value))
              }
            />
            Sim
          </label>

          <label>
            <input
              type="radio"
              name="is_tutor"
              value="false"
              onChange={event =>
                setTutor(handleRadio(event.target.value))
              }
            />
            Não
          </label>
        </div>

        <button type="submit">Cadastre-se</button>
      </form>
    </>
  );
}
