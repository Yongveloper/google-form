import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import AnswerFormHeader from '@components/Answer/AnswerFormHeader';
import AnswerFormItem from '@components/Answer/AnswerFormItem';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  setInitialAnswer,
  validateRequiredFields,
} from '@store/slices/answerSlice';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { useNavigate } from 'react-router-dom';

function ViewForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);

  const questions = useAppSelector((state) => state.question).filter(
    (question) => question.id !== 'title'
  );

  const title = useAppSelector((state) => state.question).find(
    (question) => question.id === 'title'
  );

  const answers = useAppSelector((state) => state.answer);

  const isError = useAppSelector((state) =>
    state.answer.some((answer) => answer.isError)
  );

  const handleSubmit = () => {
    setSubmitting(true);
    dispatch(validateRequiredFields());
  };

  const handleInitAnswer = () => {
    dispatch(setInitialAnswer(questions));
  };

  const handleInitAnswerBtnClick = () => {
    if (confirm('정말 양식을 지우시겠습니까?')) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      if (!isError && confirm('응답을 제출하시겠습니까?')) {
        navigate('/result', {
          state: {
            title: { title: title?.title, description: title?.contents },
            answers,
          },
        });
      }
      setSubmitting(false);
    }
  }, [isSubmitting, isError]);

  useEffect(() => {
    handleInitAnswer();
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={handleSubmit}>
          제출
        </Button>
        <Button onClick={handleInitAnswerBtnClick}>양식 지우기</Button>
      </Box>
    </>
  );
}

export default ViewForm;
