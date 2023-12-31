import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { setFocused } from '@store/slices/questionSlice';
import { Card } from '@mui/material';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';

const BlueLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: -webkit-fill-available;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: ${({ theme }) => theme.colors.blue};
`;

interface IFormContainerProps {
  id: string;
  children: React.ReactNode;
}

function FormContainer({ id, children }: IFormContainerProps) {
  const dispatch = useAppDispatch();

  const isFocused = useAppSelector(
    (state) => state.question.find((question) => question.id === id)?.isFocused
  );

  const { pathname } = useLocation();
  const isRootRoute = pathname === '/';

  const handleFocus = () => {
    if (!isRootRoute) return;
    if (isFocused) return;
    dispatch(setFocused({ id }));
  };

  return (
    <Card
      onClick={handleFocus}
      sx={{
        maxWidth: 768,
        width: '100%',
        px: '24px',
        pb: '24px',
        pt: '22px',
        position: 'relative',
      }}
    >
      {isRootRoute && isFocused && <BlueLine />}
      {children}
    </Card>
  );
}

export default FormContainer;
