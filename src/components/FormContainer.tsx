import { Card } from '@mui/material';
import React from 'react';

interface IFormContainerProps {
  children: React.ReactNode;
}

function FormContainer({ children }: IFormContainerProps) {
  return (
    <Card
      sx={{
        minWidth: 768,
        px: '24px',
        pb: '24px',
        pt: '22px',
        position: 'relative',
      }}
    >
      {children}
    </Card>
  );
}

export default FormContainer;
