import React from 'react';
import FormContainer from './FormContainer';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const PurpleLine = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.purple};
  position: absolute;
  top: 0;
  left: 0;
`;

const STextField = styled(TextField)`
  width: 100%;

  & .MuiInput-underline:before {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }
  & .MuiInput-underline:after {
    border-bottom-color: ${({ theme }) => theme.colors.purple};
  }
  & .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }
`;

function FormHeader() {
  return (
    <FormContainer>
      <PurpleLine />
      <STextField
        sx={{ mb: '10px' }}
        inputProps={{ style: { fontSize: 32 } }}
        id="standard-search"
        type="search"
        variant="standard"
        defaultValue="제목없는 설문지"
        placeholder="설문지 제목"
      />
      <STextField
        inputProps={{ style: { fontSize: 14 } }}
        id="standard-search"
        type="search"
        variant="standard"
        placeholder="설문지 설명"
      />
    </FormContainer>
  );
}

export default FormHeader;
