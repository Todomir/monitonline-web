import React, { useState } from 'react';

import { Box, HiddenRadioButton, StyledRbItem } from '../styled-components/styles';

export default function RadioButton({ callback, item, text, ...props }) {
  const [checked, setChecked] = useState(false);

  function handleClick() {
    setChecked(!checked);
    callback(item.id, !checked);
  }
  return (
    <Box>
      <HiddenRadioButton onChange={handleClick} {...props} />
      <StyledRbItem selected={checked}>{text}</StyledRbItem>
    </Box>
  );
}
