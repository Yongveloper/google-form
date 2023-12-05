import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 64px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  margin: 0 24px;
  margin-bottom: -24px;

  .vertical-dived {
    border-left: 1px solid rgb(218, 220, 224);
    height: 32px;
    margin: 0 16px;
    width: 0;
  }
`;

function FormFooter() {
  return (
    <Container>
      <IconButton>
        <ContentCopyIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <div className="vertical-dived" />
      <span>필수</span>
      <Switch inputProps={{ 'aria-label': 'Switch demo' }} />
    </Container>
  );
}

export default FormFooter;
