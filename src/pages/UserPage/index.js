import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { getToken } from '../../services/auth';

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

  return (
    <>
      <h1>MONITONLINE </h1>
      <h3>{user.name}</h3>
    </>
  );
}
