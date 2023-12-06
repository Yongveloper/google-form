import React from 'react';
import FormContainer from './FormContainer';
import styled from 'styled-components';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setContents, setTitle } from '@store/slices/questionSlice';
import { useAppSelector } from '@hooks/useAppSelector';
import { STextField } from '../common/STextField.styles';
import { inputType } from '@store/types';

const PurpleLine = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.purple};
  position: absolute;
  top: 0;
  left: 0;
`;

function FormHeader() {
  const dispatch = useAppDispatch();

  const title = useAppSelector(
    (state) =>
      state.question.find((question) => question.id === inputType.title)?.title
  );

  const contents = useAppSelector(
    (state) =>
      state.question.find((question) => question.id === inputType.title)
        ?.contents
  );

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ id: inputType.title, contents: e.target.value }));
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setContents({ id: inputType.title, contents: e.target.value }));
  };

  return (
    <FormContainer id="title">
      <PurpleLine />
      <STextField
        sx={{ mb: '10px' }}
        inputProps={{ style: { fontSize: 32 } }}
        id="standard-search"
        type="search"
        variant="standard"
        placeholder="설문지 제목"
        value={title}
        onChange={handleTitle}
      />
      <STextField
        inputProps={{ style: { fontSize: 14 } }}
        id="standard-search"
        type="search"
        variant="standard"
        placeholder="설문지 설명"
        value={contents}
        onChange={handleDescription}
      />
    </FormContainer>
  );
}

export default FormHeader;
