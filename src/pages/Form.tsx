import React from 'react';
import styled from 'styled-components';
import FormHeader from '@components/FormHeader';
import { useAppSelector } from '@hooks/useAppSelector';
import QuestionForm from '@components/QuestionForm';
import Sidebar from '@components/Sidebar';

const Container = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  max-width: 768px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 38px 0;
`;

function Form() {
  const questions = useAppSelector((state) => state.question).filter(
    (question) => question.id !== 'title'
  );

  console.log(questions);

  return (
    <Container>
      <FormHeader />
      {questions.map((question) => (
        <QuestionForm key={question.id} id={question.id} />
      ))}
      <Sidebar />
    </Container>
  );
}

export default Form;
