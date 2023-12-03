import * as styled from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyles = styled.createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
`;
