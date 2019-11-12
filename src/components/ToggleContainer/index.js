import React from 'react';

// import { Container } from './styles';

export default function ToggleContainer(props) {
  if (props.toggle) {
    return <>{props.children}</>;
  } else {
    return null;
  }
}
