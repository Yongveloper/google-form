import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  copyQuestion,
  deleteQuestion,
  setRequired,
} from '@store/slices/questionSlice';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 64px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 0 24px;
  margin-bottom: -24px;

  .vertical-dived {
    border-left: 1px solid rgb(218, 220, 224);
    height: 32px;
    margin: 0 16px;
    width: 0;
  }
`;

interface IFormFooterProps {
  id: string;
  isRequired: boolean;
}

function FormFooter({ id, isRequired }: IFormFooterProps) {
  const dispatch = useAppDispatch();

  const handleCopyQuestion = () => {
    dispatch(copyQuestion({ id }));
  };

  const handleDeleteQuestion = () => {
    dispatch(deleteQuestion({ id }));
  };

  const handleRequired = () => {
    dispatch(setRequired({ id }));
  };

  return (
    <Container>
      <IconButton onClick={handleCopyQuestion}>
        <ContentCopyIcon />
      </IconButton>
      <IconButton onClick={handleDeleteQuestion}>
        <DeleteIcon />
      </IconButton>
      <div className="vertical-dived" />
      <span>필수</span>
      <Switch
        inputProps={{ 'aria-label': 'Require toggle' }}
        onChange={handleRequired}
        checked={isRequired}
      />
    </Container>
  );
}

export default FormFooter;
