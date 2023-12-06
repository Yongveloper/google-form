import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAction, IContents, InputType, IQuestion } from '@store/types';

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
    id: String(Date.now()),
    title: '질문',
    inputType: 'radio',
    contents: [
      {
        id: String(Date.now() + 1),
        text: '옵션 1',
        isEtc: false,
      },
    ],
    isFocused: false,
    isRequired: false,
  },
];

const createNewQuestion = (id: string) => {
  return {
    id,
    title: '',
    inputType: 'radio',
    contents: [
      {
        id: String(Number(id) + 1),
        text: '옵션 1',
        isEtc: false,
      },
    ],
    isFocused: true,
    isRequired: false,
  } as IQuestion;
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    addNewQuestion: (state: IQuestion[]) => {
      state.forEach((question) => {
        question.isFocused = false;
      });
      const newId = String(Number(Date.now()) + 1);
      state.push(createNewQuestion(newId));
    },
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
      // 짧은답변, 긴답변으로 변경시 contents는 빈 텍스트로 초기화
      if (
        action.payload.contents === 'shortAnswer' ||
        action.payload.contents === 'longAnswer'
      ) {
        state[targetIndex].contents = '';
      }
      // 짧은답변, 긴답변에서 라디오, 체크박스로 변경시 옵션 1 추가
      if (
        state[targetIndex].inputType === 'shortAnswer' ||
        state[targetIndex].inputType === 'longAnswer'
      ) {
        if (
          action.payload.contents === 'radio' ||
          action.payload.contents === 'checkbox' ||
          action.payload.contents === 'dropdown'
        ) {
          state[targetIndex].contents = [
            {
              id: String(Date.now()),
              text: '옵션 1',
              isEtc: false,
            },
          ];
        }
      }
      // 드롭다운에서 라디오, 체크박스로 변경시 마지막에 etc가 있으면 삭제
      if (action.payload.contents === 'dropdown') {
        const contents = state[targetIndex].contents as IContents[];
        if (contents[contents.length - 1].isEtc) {
          contents.pop();
        }
      }
      state[targetIndex].inputType = action.payload.contents as InputType;
    },
    setFocused: (state: IQuestion[], action: PayloadAction<{ id: string }>) => {
      state.forEach((question) => {
        if (question.id !== action.payload.id) {
          question.isFocused = false;
        } else {
          question.isFocused = true;
        }
      });
    },
    changeItemContent: (
      state: IQuestion[],
      action: PayloadAction<{ id: string; contentId: string; text: string }>
    ) => {
      const targetIndex = state.findIndex(
        (question) => question.id === action.payload.id
      );
      const contents = state[targetIndex].contents as IContents[];
      const target = contents.find(
        (content) => content.id === action.payload.contentId
      ) as IContents;
      target.text = action.payload.text;
    },
    addInputItem: (
      state: IQuestion[],
      action: PayloadAction<{
        id: string;
        contentId: string;
        text: string;
        isEtc: boolean;
      }>
    ) => {
      const contents = state.find(
        (question) => question.id === action.payload.id
      )?.contents as IContents[];
      // contents에의 마지막 요소의 isEtc가 true면 마지막 앞에 추가
      // 아니면 마지막에 추가
      const lastItem = contents[contents.length - 1];
      if (lastItem.isEtc) {
        contents.splice(contents.length - 1, 0, {
          id: action.payload.contentId,
          text: action.payload.text,
          isEtc: action.payload.isEtc,
        });
      } else {
        contents.push({
          id: action.payload.contentId,
          text: action.payload.text,
          isEtc: action.payload.isEtc,
        });
      }
    },
    deleteInputItem: (
      state: IQuestion[],
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      const contents = state.find(
        (question) => question.id === action.payload.id
      )?.contents as IContents[];
      const targetIndex = contents.findIndex(
        (content) => content.id === action.payload.contentId
      );
      contents.splice(targetIndex, 1);
    },
    copyQuestion: (
      state: IQuestion[],
      action: PayloadAction<{ id: string }>
    ) => {
      const targetIndex = state.findIndex(
        (question) => question.id === action.payload.id
      );
      state[targetIndex].isFocused = false;
      const newId = String(Date.now());
      const newQuestion = { ...state[targetIndex], id: newId, isFocused: true };
      state.splice(targetIndex + 1, 0, newQuestion);
    },
    deleteQuestion: (
      state: IQuestion[],
      action: PayloadAction<{ id: string }>
    ) => {
      const targetIndex = state.findIndex(
        (question) => question.id === action.payload.id
      );
      state[targetIndex - 1].isFocused = true;
      state.splice(targetIndex, 1);
    },
    setRequired: (
      state: IQuestion[],
      action: PayloadAction<{ id: string }>
    ) => {
      const targetIndex = state.findIndex(
        (question) => question.id === action.payload.id
      );
      state[targetIndex].isRequired = !state[targetIndex].isRequired;
    },
    moveQuestion: (
      state: IQuestion[],
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.splice(sourceIndex + 1, 1);
      state.splice(destinationIndex + 1, 0, removed);
    },
    moveQuestionItem: (
      state: IQuestion[],
      action: PayloadAction<{
        questionId: string;
        sourceIndex: number;
        destinationIndex: number;
      }>
    ) => {
      const { questionId, sourceIndex, destinationIndex } = action.payload;
      const contents = state.find((question) => question.id === questionId)
        ?.contents as IContents[];
      const [removed] = contents.splice(sourceIndex, 1);
      contents.splice(destinationIndex, 0, removed);
      console.log('render');
    },
  },
});

export const {
  addNewQuestion,
  setTitle,
  setContents,
  setInputType,
  setFocused,
  changeItemContent,
  addInputItem,
  deleteInputItem,
  copyQuestion,
  deleteQuestion,
  setRequired,
  moveQuestion,
  moveQuestionItem,
} = questionSlice.actions;

export default questionSlice.reducer;
