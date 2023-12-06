import React from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setSentenceAnswer } from '@store/slices/answerSlice';
import { useAppSelector } from '@hooks/useAppSelector';

interface IAnswerInputProps {
  id: string;
  width: string;
  maxLength?: number;
  placeholder: string;
}

function AnswerInput({ id, width, maxLength, placeholder }: IAnswerInputProps) {
  const dispatch = useAppDispatch();

  const value =
    useAppSelector(
      (state) => state.answer.find((answer) => answer.id === id)?.answers
    ) ?? '';

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSentenceAnswer({ id, text: e.target.value }));
  };

  return (
    <TextField
      style={{ width, marginTop: '16px' }}
      id="standard-search"
      inputProps={{ maxLength }}
      type="search"
      variant="standard"
      placeholder={placeholder}
      value={value}
      onChange={handleAnswer}
    />
  );
}

export default AnswerInput;
