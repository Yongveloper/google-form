import React from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setEtcText } from '@store/slices/answerSlice';

interface IUseEtcAnswerInputProps {
  id: string;
}

export function useEtcAnswerInput({ id }: IUseEtcAnswerInputProps) {
  const dispatch = useAppDispatch();

  const handleEtcTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string
  ) => {
    e.stopPropagation(); // 이벤트 버블링 방지 (기타 텍스트 필드에 값 입력시 부모의 이벤트가 실행되는 것을 방지)
    const { value } = e.target;
    dispatch(setEtcText({ id, contentId, text: value }));
  };

  return { handleEtcTextFieldChange };
}
