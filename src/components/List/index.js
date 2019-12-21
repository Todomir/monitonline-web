import React, { useState, useEffect } from 'react';

import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';
import { Box } from '../styled-components/styles';

export default function List({ callback, multi, items }) {
  const [selected, setSelected] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    callback(selected, checked);
  }, [selected, checked]);

  function itemCallback(id, selected) {
    setSelected(id);
    setChecked(selected);
  }

  if (multi) {
    return (
      <Box padding="20px">
        {items.map(item => (
          <label>
            <Checkbox callback={itemCallback} name="group" data={item} value={item.id} />
          </label>
        ))}
      </Box>
    );
  }

  return (
    <Box padding="20px">
      {items.map(item => (
        <label>
          <RadioButton callback={itemCallback} name="group" data={item} value={item.id} />
        </label>
      ))}
    </Box>
  );
}
