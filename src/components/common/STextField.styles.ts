import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const STextField = styled(TextField)`
  width: 100%;

  & .MuiInput-underline:before,
  & .MuiFilledInput-underline:before {
    border-bottom: none;
    border-bottom-color: ${({ theme }) => theme.colors.grey};
  }

  & .MuiInput-underline:after,
  & .MuiFilledInput-underline:after {
    border-bottom: 2px solid ${({ theme }) => theme.colors.purple};
  }

  & .MuiInput-underline:hover:not(.Mui-disabled):before,
  & .MuiFilledInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }
`;
