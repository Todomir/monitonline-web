import React from 'react';

import { AssistanceProvider } from './AssistanceContext';
import { SubjectMatterProvider } from './SubjectMatterContext';
import { UserProvider } from './UserContext';

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
    <ProviderComposer
      contexts={[<UserProvider />, <AssistanceProvider />, <SubjectMatterProvider />]}
    >
      {children}
    </ProviderComposer>
  );
}

export { GlobalProvider };
