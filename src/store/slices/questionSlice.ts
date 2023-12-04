import { createSlice } from '@reduxjs/toolkit';

type InputType =
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
  isEtc?: boolean;
}

export interface IQuestion {
  id: string;
  title: string;
  inputType: InputType;
  contents: string | IContents[];
  isFocused: boolean;
  isRequired: boolean;
}

interface IAction {
  type: string;
  payload: {
    id: string;
    contents: string | IContents[];
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
  {
    id: '1',
    title: '질문',
    inputType: 'radio',
    contents: [
      {
        id: '2',
        text: '옵션 1',
      },
      {
        id: '3',
        text: '옵션 2',
      },
    ],
    isFocused: false,
    isRequired: false,
  },
];

const createNewCard: IQuestion = (id: string, title = '') => ({
  id,
  title,
  inputType: 'radio',
  contents: [
    {
      id: String(Number(id) + 1),
      text: '옵션 1',
    },
  ],
  isFocused: true,
  isRequired: false,
});

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
    setInputType: (state: IQuestion[], action: IAction) => {
      const targetIndex = state.findIndex(
        (question) => question.id === action.payload.id
      );
      state[targetIndex].inputType = action.payload.contents as InputType;
      if (
        action.payload.contents === 'shortAnswer' ||
        action.payload.contents === 'longAnswer'
      ) {
        state[targetIndex].contents = '';
      } else {
        state[targetIndex].contents = [
          {
            id: String(Number(action.payload.id) + 1),
            text: '옵션 1',
          },
        ];
      }
    },
    setFocused: (state: IQuestion[], action) => {
      state.forEach((question) => {
        if (question.id !== action.payload.id) {
          question.isFocused = false;
        } else {
          question.isFocused = true;
        }
      });
    },
    addInputItem: (state: IQuestion[], action) => {
      const contents = state.find(
        (question) => question.id === action.payload.id
      )?.contents as IContents[];
      contents.push({
        id: action.payload.contentId,
        text: action.payload.text,
      });
    },
  },
});

export const { setTitle, setContents, setInputType, setFocused, addInputItem } =
  questionSlice.actions;

export default questionSlice.reducer;
