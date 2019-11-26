import React from 'react';
import { UserProvider } from './UserContext';
import { AssistanceProvider } from './AssistanceContext';
import { CommentProvider } from './CommentContext';

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids
      }),
    children
  );
}

function GlobalProvider({ children }) {
  return (
    <ProviderComposer contexts={[<UserProvider />, <AssistanceProvider />, <CommentProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { GlobalProvider };
