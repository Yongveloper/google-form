import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      purple: string;
      blue: string;
      grey: string;
      lightGrey: string;
    };
  }
}
