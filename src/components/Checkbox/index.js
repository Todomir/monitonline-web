import React from 'react';
import { HiddenCheckbox } from '../styled-components/styles';

export default function Checkbox({ checked, ...props }) {
  return <HiddenCheckbox checked={checked} {...props} />;
}
