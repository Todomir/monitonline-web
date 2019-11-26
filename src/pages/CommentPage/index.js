import React, { useContext } from 'react';

import { CommentContext } from '../../store/CommentContext';

// import { Container } from './styles';

export default function CommentPage() {
  const { comments } = useContext(CommentContext);
  return <div>{JSON.stringify(comments)}</div>;
}
