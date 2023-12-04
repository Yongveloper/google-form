import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const STextField = styled(TextField)`
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

  & .MuiFilledInput-underline:before {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }
  & .MuiFilledInput-underline:after {
    border-bottom-color: ${({ theme }) => theme.colors.purple};
  }
  & .MuiFilledInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }
`;
