import { useAppSelector } from '@hooks/useAppSelector';
import { Card } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Typography from '@mui/material/Typography';
interface IAnswerFormContainerProps {
  id: string;
  children: React.ReactNode;
}

function AnswerFormContainer({ id, children }: IAnswerFormContainerProps) {
  const isError = useAppSelector(
    (state) => state.answer.find((answer) => answer.id === id)?.isError ?? false
  );

  return (
    <Card
      sx={{
        maxWidth: 768,
        width: '100%',
        px: '24px',
        pb: '24px',
        pt: '22px',
        position: 'relative',
        border: isError ? '1px solid #be0000' : 'none',
      }}
    >
      {children}
      {isError && (
        <Typography
          variant="caption"
          display="flex"
          alignItems="center"
          gap="10px"
          color="#be0000"
          marginTop="10px"
        >
          <ErrorOutlineIcon /> 필수 질문입니다.
        </Typography>
      )}
    </Card>
  );
}

export default AnswerFormContainer;
