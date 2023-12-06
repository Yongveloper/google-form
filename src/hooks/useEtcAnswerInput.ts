import React, { useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setEtcText } from '@store/slices/answerSlice';

interface IUseEtcAnswerInputProps {
  id: string;
}

export function useEtcAnswerInput({ id }: IUseEtcAnswerInputProps) {
  const [etcTextFieldValue, setEtcTextFieldValue] = useState('');
  const dispatch = useAppDispatch();

  const handleEtcTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string
  ) => {
    e.stopPropagation();
    const { value } = e.target;
    setEtcTextFieldValue(value);
    dispatch(setEtcText({ id, contentId, text: value }));
  };

  return { etcTextFieldValue, handleEtcTextFieldChange };
}
