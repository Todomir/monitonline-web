import React, { useContext } from 'react';

import { AssistanceContext } from '../../store/AssistanceContext';
import Graph from '../Graph';
import Status from '../Status';
import { Box } from '../styled-components/styles';
import { Tree } from '../Tree';

export default function AssistancesBlock() {
  const { tutorAssistances } = useContext(AssistanceContext);

  const rawSubjects = tutorAssistances.map(assistance =>
    JSON.stringify(assistance.subjectMatter.subject)
  );
  const rawSubjectMatters = tutorAssistances.map(assistance =>
    JSON.stringify(assistance.subjectMatter)
  );

  const filteredSubjects = [...new Set(rawSubjects)];
  const filteredSubjectMatters = [...new Set(rawSubjectMatters)];

  const subjectsArray = filteredSubjects.map(subject => JSON.parse(subject));
  const subjectMattersArray = filteredSubjectMatters.map(subjectMatter =>
    JSON.parse(subjectMatter)
  );

  return (
    <Box>
      {subjectsArray.map(subject => (
        <Tree name={subject.subject_description.toUpperCase()}>
          {subjectMattersArray.map(sm => {
            if (sm.subject_id === subject.id) {
              return (
                <Tree
                  color="#b276ff"
                  name={sm.subject_matter_description.toUpperCase()}
                  key={sm.id}
                >
                  <Tree name="Avaliações" defaultOpen>
                    <Graph id={sm.id} />
                  </Tree>
                  <Tree name="Atendimentos" defaultOpen>
                    {tutorAssistances.map(assistance => {
                      if (assistance.subject_matter_id === sm.id) {
                        return (
                          <Box key={assistance.id} marginBottom="10px">
                            <p>
                              <strong>Aluno:</strong> {assistance.student.name}
                            </p>
                            <p>
                              <Status
                                statusId={assistance.status_id}
                                assistanceId={assistance.id}
                              />
                            </p>
                          </Box>
                        );
                      }
                    })}
                  </Tree>
                </Tree>
              );
            }
          })}
        </Tree>
      ))}
    </Box>
  );
}
