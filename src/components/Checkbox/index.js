import React, { useState } from 'react';

import { Box, HiddenCheckbox, StyledCbItem } from '../styled-components/styles';

export default function Checkbox({ callback, item, text, ...props }) {
  const [checked, setChecked] = useState(false);

  function handleClick(event) {
    setChecked(event.target.checked);
    callback(item, !checked);
  }

  return (
    <Box height="100%">
      <HiddenCheckbox onChange={handleClick} {...props} />
      <StyledCbItem selected={checked}>{text}</StyledCbItem>
    </Box>
  );
}
