export type InputType =
  | 'title'
  | 'description'
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'shortAnswer'
  | 'longAnswer';

export interface IContents {
  id: string;
  text: string;
  isEtc: boolean;
}

export interface IQuestion {
  id: string;
  title: string;
  inputType: InputType;
  contents: string | IContents[];
  isFocused: boolean;
  isRequired: boolean;
}

export interface IAction {
  type: string;
  payload: {
    id: string;
    contents: string | IContents[];
  };
}
