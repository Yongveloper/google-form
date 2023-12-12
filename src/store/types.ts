export const inputType = {
  title: 'title',
  description: 'description',
  radio: 'radio',
  checkbox: 'checkbox',
  dropdown: 'dropdown',
  shortAnswer: 'shortAnswer',
  longAnswer: 'longAnswer',
} as const;

export type InputType = (typeof inputType)[keyof typeof inputType];

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

export interface IMultipleAnswerType {
  id: string;
  text: string;
  isChecked: boolean;
  isEtc: boolean;
}

export interface IAnswerStateType {
  id: string;
  title: string;
  inputType: InputType;
  answers: string | IMultipleAnswerType[];
  isRequired: boolean;
  isError: boolean;
}
