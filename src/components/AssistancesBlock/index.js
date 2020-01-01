import React, { useContext } from 'react';

import { AssistanceContext } from '../../store/AssistanceContext';
import Status from '../Status';
import { Box, CardContainer } from '../styled-components/styles';

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
    <CardContainer padding="36px" marginRight bgColor="#FFF" gridColumn="1/12">
      <Box marginTop="10px">
        {subjectsArray.map(subject => (
          <Box marginBottom="100px">
            <h3>{subject.subject_description.toUpperCase()}</h3>
            {subjectMattersArray.map(sm => {
              if (sm.subject_id === subject.id) {
                return (
                  <Box marginLeft="44px">
                    <p style={{ marginBottom: '15px', marginTop: '10px', color: '#B276FF' }}>
                      {sm.subject_matter_description.toUpperCase()}
                    </p>
                    {tutorAssistances.map(assistance => {
                      if (assistance.subject_matter_id === sm.id) {
                        return (
                          <Box marginBottom="15px">
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
                  </Box>
                );
              }
            })}
          </Box>
        ))}
      </Box>
    </CardContainer>
  );
}
