import React from 'react';
import FormContainer from './FormContainer';
import styled from 'styled-components';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setContents, setTitle } from '@store/slices/questionSlice';
import { useAppSelector } from '@hooks/useAppSelector';
import { STextField } from './common/STextField.styles';

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
  const header = useAppSelector((state) =>
    state.question.find((q) => q.id === 'title')
  );

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ id: 'title', contents: e.target.value }));
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setContents({ id: 'title', contents: e.target.value }));
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
        value={header?.title}
        onChange={handleTitle}
      />
      <STextField
        inputProps={{ style: { fontSize: 14 } }}
        id="standard-search"
        type="search"
        variant="standard"
        placeholder="설문지 설명"
        value={header?.contents}
        onChange={handleDescription}
      />
    </FormContainer>
  );
}

export default FormHeader;
