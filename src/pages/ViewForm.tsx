import React from 'react';
import { useAppSelector } from '@hooks/useAppSelector';

import AnswerFormHeader from '@components/Answer/AnswerFormHeader';
import AnswerFormItem from '@components/Answer/AnswerFormItem';

function ViewForm() {
  const questions = useAppSelector((state) => state.question).filter(
    (question) => question.id !== 'title'
  );
  console.log(questions);

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
