import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { inputType, InputType, IQuestion } from '@store/types';

interface MultipleAnswerType {
  id: string;
  text: string;
  isChecked: boolean;
}

interface initialStateType {
  id: string;
  title: string;
  inputType: InputType;
  answers: string | MultipleAnswerType[];
  isRequired: boolean;
  isError: boolean;
}

const initialState: initialStateType[] = [];

const getTargetQuestion = (
  state: initialStateType[],
  id: string
): initialStateType => {
  return state.find((question) => question.id === id) as initialStateType;
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
      state: initialStateType[],
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
      const answers = question?.answers as MultipleAnswerType[];

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
      state: initialStateType[],
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      const question = getTargetQuestion(state, action.payload.id);
      const targetAnswers = question?.answers as MultipleAnswerType[];
      const targetAnswerItem = targetAnswers.find(
        (answer) => answer.id === action.payload.contentId
      ) as MultipleAnswerType;

      if (question.isError) {
        question.isError = false;
      }

      targetAnswerItem.isChecked = !targetAnswerItem.isChecked;
    },
    setEtcText: (
      state: initialStateType[],
      action: PayloadAction<{ id: string; contentId: string; text: string }>
    ) => {
      const question = getTargetQuestion(state, action.payload.id);
      const targetAnswers = question?.answers as MultipleAnswerType[];
      const targetAnswerItem = targetAnswers.find(
        (answer) => answer.id === action.payload.contentId
      ) as MultipleAnswerType;

      targetAnswerItem.text = action.payload.text;
    },
    validateRequiredFields: (state: initialStateType[]) => {
      state.forEach((question) => {
        if (question.isRequired) {
          if (
            question.inputType === inputType.longAnswer ||
            question.inputType === inputType.shortAnswer
          ) {
            question.isError = question.answers === '';
          } else {
            const targetAnswers = getTargetQuestion(state, question.id)
              ?.answers as MultipleAnswerType[];
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
