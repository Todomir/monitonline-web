import React, { useContext } from 'react';

import { AssistanceContext } from '../../store/AssistanceContext';

// import { Container } from './styles';

export default function CommentPage() {
  const { currentAssistance } = useContext(AssistanceContext);
  return <div>{JSON.stringify(currentAssistance)}</div>;
}
