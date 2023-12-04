import React from 'react';
import styled from 'styled-components';
import FormHeader from '@components/FormHeader';
import { useAppSelector } from '@hooks/useAppSelector';
import QuestionForm from '@components/QuestionForm';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { addNewQuestion } from '@store/slices/questionSlice';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

function Form() {
  const questions = useAppSelector((state) => state.question).filter(
    (question) => question.id !== 'title'
  );
  const dispatch = useAppDispatch();
  console.log(questions);

  const handleAddNewQuestion = () => {
    dispatch(addNewQuestion());
  };

  return (
    <Container>
      <FormHeader />
      {questions.map((question) => (
        <QuestionForm key={question.id} id={question.id} />
      ))}
      <button onClick={handleAddNewQuestion}>추가</button>
    </Container>
  );
}

export default Form;
