import React, { useContext } from 'react';
import { MdChatBubbleOutline } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { parseISO, format } from 'date-fns';

import { AssistanceContext } from '../../store/AssistanceContext';
import Graph from '../Graph';
import Status from '../Status';
import { Box, Button } from '../styled-components/styles';
import { Tree } from '../Tree';

export default function AssistancesBlock({ isTutor }) {
  const { tutorAssistances } = useContext(AssistanceContext);
  const history = useHistory();

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
                  {isTutor && (
                    <Tree name="Atendimentos" defaultOpen>
                      {tutorAssistances.map(assistance => {
                        if (assistance.subject_matter_id === sm.id) {
                          return (
                            <Box key={assistance.id} marginBottom="10px">
                              <p>
                                <strong>Aluno:</strong> {assistance.student.name}
                              </p>
                              <p>
                                <strong>Horário:</strong> De{' '}
                                {format(
                                  parseISO(assistance.schedule.schedule_start),
                                  'dd/MM/yyyy HH:mm'
                                )}{' '}
                                à{' '}
                                {format(
                                  parseISO(assistance.schedule.schedule_end),
                                  'dd/MM/yyyy HH:mm'
                                )}
                              </p>
                              <p>
                                <Status
                                  statusId={assistance.status_id}
                                  assistanceId={assistance.id}
                                  isTutor
                                />
                              </p>
                            </Box>
                          );
                        }
                      })}
                    </Tree>
                  )}

                  <Button
                    marginTop="15px"
                    marginBottom="15px"
                    onClick={() => {
                      localStorage.setItem('subject_matter_id', sm.id);
                      localStorage.setItem('commentable', false);
                      history.push('/comments');
                    }}
                  >
                    <MdChatBubbleOutline /> Comentários
                  </Button>
                </Tree>
              );
            }
          })}
        </Tree>
      ))}
    </Box>
  );
}
