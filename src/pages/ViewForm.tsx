import React, { useEffect } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';

import AnswerFormHeader from '@components/Answer/AnswerFormHeader';
import AnswerFormItem from '@components/Answer/AnswerFormItem';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setInitialAnswer } from '@store/slices/answerSlice';

function ViewForm() {
  const dispatch = useAppDispatch();

  const questions = useAppSelector((state) => state.question).filter(
    (question) => question.id !== 'title'
  );

  useEffect(() => {
    dispatch(setInitialAnswer(questions));
  }, []);

  return (
    <>
      <AnswerFormHeader />
      {questions.map((question) => (
        <AnswerFormItem
          key={question.id}
          id={question.id}
          title={question.title}
          inputType={question.inputType}
          isRequired={question.isRequired}
          contents={question.contents}
        />
      ))}
    </>
  );
}

export default ViewForm;
