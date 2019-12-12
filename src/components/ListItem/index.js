import React, { useState } from 'react';
import { StyledListItem } from '../styled-components/styles';

export default function ListItem({ callback, item, children }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    callback(item.id, !selected);
  };

  return (
    <StyledListItem isSelected={selected} onClick={handleClick}>
      {children}
    </StyledListItem>
  );
}
