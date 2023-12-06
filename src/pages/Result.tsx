import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnswerStateType, MultipleAnswerType } from '@store/slices/answerSlice';
import ResultCard from '@components/Result/ResultCard';
import { inputType } from '@store/types';
import Typography from '@mui/material/Typography';
import DropdownTypeItem from '@components/Result/DropdownTypeItem';
import CheckTypeItem from '@components/Result/CheckTypeItem';

function Result() {
  const location = useLocation();
  const answers: AnswerStateType[] = location.state.answers;
  const { title: surveyTitle, description: surveyDescription } =
    location.state.title;

  return (
    <>
      <ResultCard>
        <Typography variant="h4">{surveyTitle}</Typography>
        <Typography variant="subtitle1">{surveyDescription}</Typography>
      </ResultCard>
      {answers.map((answer) => (
        <ResultCard key={answer.id}>
          <Typography variant="h6" sx={{ mb: '8px' }}>
            {answer.title}
            {answer.isRequired && (
              <Typography variant="subtitle2" color="red">
                * 필수 응답
              </Typography>
            )}
          </Typography>
          {typeof answer.answers === 'string' && (
            <Typography variant="subtitle2">{answer.answers}</Typography>
          )}
          {answer.inputType === inputType.radio && (
            <CheckTypeItem
              items={answer.answers as MultipleAnswerType[]}
              type={answer.inputType}
            />
          )}
          {answer.inputType === inputType.checkbox && (
            <CheckTypeItem
              items={answer.answers as MultipleAnswerType[]}
              type={answer.inputType}
            />
          )}
          {answer.inputType === inputType.dropdown && (
            <DropdownTypeItem
              text={
                Array.isArray(answer.answers)
                  ? answer.answers.find((item) => item.text)?.text || ''
                  : ''
              }
            />
          )}
        </ResultCard>
      ))}
    </>
  );
}

export default Result;
