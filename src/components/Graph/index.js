import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import api from '../../services/api';
import { Box } from '../styled-components/styles';

export default function Graph({ id }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const response = await api.get(`/reviews/subject/${id}`);
      setReviews(response.data.map(item => item.review));
    }
    getReviews();
  }, [id]);

  return (
    <Box width="500px">
      <Line
        options={{
          responsive: true,
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  steps: 5,
                  stepValue: 5,
                  max: 5
                }
              }
            ]
          }
        }}
        data={{
          labels: ['', '', '', '', '', ''],
          datasets: [
            {
              label: 'Histórico de avaliações',
              backgroundColor: 'rgba(178, 118, 255, 0.45)',
              data: reviews
            }
          ]
        }}
      />
    </Box>
  );
}
