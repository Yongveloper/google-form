import { Card } from '@mui/material';

interface IAnswerFormContainerProps {
  children: React.ReactNode;
}

function AnswerFormContainer({ children }: IAnswerFormContainerProps) {
  return (
    <Card
      sx={{
        maxWidth: 768,
        width: '100%',
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

export default AnswerFormContainer;
