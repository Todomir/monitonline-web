import React from 'react';
import { UserProvider } from './UserContext';
import { AssistanceProvider } from './AssistanceContext';

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
    <ProviderComposer contexts={[<UserProvider />, <AssistanceProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { GlobalProvider };
