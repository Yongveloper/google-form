import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IAnswerStateType,
  IMultipleAnswerType,
  inputType,
  IQuestion,
} from '@store/types';

const initialState: IAnswerStateType[] = [];

const getTargetQuestion = (
  state: IAnswerStateType[],
  id: string
): IAnswerStateType => {
  return state.find((question) => question.id === id) as IAnswerStateType;
};

const answerSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setInitialAnswer: (_, action: PayloadAction<IQuestion[]>) => {
      return action.payload.map((question) => ({
        id: question.id,
        title: question.title,
        inputType: question.inputType,
        answers: Array.isArray(question.contents)
          ? question.contents.map((content) => ({
              id: content.id,
              text: content.text,
              isChecked: false,
            }))
          : '',
        isRequired: question.isRequired,
        isError: false,
      }));
    },
    setSentenceAnswer: (
      state: IAnswerStateType[],
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const { id, text } = action.payload;
      const question = getTargetQuestion(state, id);

      if (question.isError) {
        question.isError = false;
      }

      question.answers = text;
    },
    setSingleInputSelectionAnswer: (
      state,
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      const question = getTargetQuestion(state, action.payload.id);
      const answers = question?.answers as IMultipleAnswerType[];

      if (question.isError) {
        question.isError = false;
      }
      answers.forEach((answer) => {
        if (answer.id === action.payload.contentId) {
          answer.isChecked = true;
        } else {
          answer.isChecked = false;
        }
      });
    },
    setCheckboxAnswer: (
      state: IAnswerStateType[],
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      const question = getTargetQuestion(state, action.payload.id);
      const targetAnswers = question?.answers as IMultipleAnswerType[];
      const targetAnswerItem = targetAnswers.find(
        (answer) => answer.id === action.payload.contentId
      ) as IMultipleAnswerType;

      if (question.isError) {
        question.isError = false;
      }

      targetAnswerItem.isChecked = !targetAnswerItem.isChecked;
    },
    setEtcText: (
      state: IAnswerStateType[],
      action: PayloadAction<{ id: string; contentId: string; text: string }>
    ) => {
      const question = getTargetQuestion(state, action.payload.id);
      const targetAnswers = question?.answers as IMultipleAnswerType[];
      const targetAnswerItem = targetAnswers.find(
        (answer) => answer.id === action.payload.contentId
      ) as IMultipleAnswerType;

      targetAnswerItem.text = action.payload.text;
    },
    validateRequiredFields: (state: IAnswerStateType[]) => {
      state.forEach((question) => {
        if (question.isRequired) {
          if (
            question.inputType === inputType.longAnswer ||
            question.inputType === inputType.shortAnswer
          ) {
            question.isError = question.answers === '';
          } else {
            const targetAnswers = getTargetQuestion(state, question.id)
              ?.answers as IMultipleAnswerType[];
            const isChecked = targetAnswers.some((answer) => answer.isChecked);
            question.isError = !isChecked;
          }
        }
      });
    },
  },
});

export const {
  setInitialAnswer,
  setSentenceAnswer,
  setSingleInputSelectionAnswer,
  setCheckboxAnswer,
  setEtcText,
  validateRequiredFields,
} = answerSlice.actions;

export default answerSlice.reducer;
