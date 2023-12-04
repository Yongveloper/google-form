import { createSlice } from '@reduxjs/toolkit';

type InputType =
  | 'title'
  | 'description'
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'shortAnswer'
  | 'longAnswer';

interface IContentsArray {
  id: string;
  contents: string;
}

interface IQuestion {
  id: string;
  title: string;
  inputType: InputType;
  contents: string | IContentsArray[];
  isFocused: boolean;
  isRequired: boolean;
}

interface IAction {
  type: string;
  payload: {
    id: string;
    contents: string | IContentsArray[];
  };
}

const initialState: IQuestion[] = [
  {
    id: 'title',
    title: '제목 없는 설문지',
    inputType: 'title',
    contents: '',
    isFocused: false,
    isRequired: false,
  },
];

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setTitle: (state: IQuestion[], action: IAction) => {
      const targetIndex = state.findIndex(
        (question) => question.id === action.payload.id
      );

      state[targetIndex].title = action.payload.contents as string;
    },
    setContents: (state: IQuestion[], action: IAction) => {
      const targetIndex = state.findIndex(
        (question) => question.id === action.payload.id
      );
      if (typeof action.payload.contents === 'string') {
        state[targetIndex].contents = action.payload.contents;
      } else {
        // 배열인경우
        state[targetIndex].contents = action.payload.contents;
      }
    },
  },
});

export const { setTitle, setContents } = questionSlice.actions;

export default questionSlice.reducer;
