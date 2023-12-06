import React from 'react';
import { Card } from '@mui/material';

interface IResultCardProps {
  children: React.ReactNode;
}

function ResultCard({ children }: IResultCardProps) {
  return (
    <Card
      sx={{ maxWidth: 768, width: '100%', px: '24px', pb: '24px', pt: '22px' }}
    >
      {children}
    </Card>
  );
}

export default ResultCard;
