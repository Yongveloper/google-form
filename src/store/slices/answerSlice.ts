import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InputType, IQuestion } from '@store/types';

interface CheckboxAnswerType {
  id: string;
  text: string;
  isChecked: boolean;
}

interface initialStateType {
  id: string;
  title: string;
  inputType: InputType;
  answers: string | CheckboxAnswerType[];
  isRequired: boolean;
}

const initialState: initialStateType[] = [];

const getTargetAnswers = (
  state: initialStateType[],
  id: string
): CheckboxAnswerType[] => {
  return state.find((question) => question.id === id)
    ?.answers as CheckboxAnswerType[];
};

const findTargetAnswerItem = (
  state: initialStateType[],
  { id, contentId }: { id: string; contentId: string }
): CheckboxAnswerType => {
  const targetAnswers = getTargetAnswers(state, id);
  return targetAnswers.find(
    (answer) => answer.id === contentId
  ) as CheckboxAnswerType;
};

const answerSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setInitialAnswer: (state, action: PayloadAction<IQuestion[]>) => {
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
      }));
    },
    setSentenceAnswer: (
      state: initialStateType[],
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const { id, text } = action.payload;
      const targetIndex = state.findIndex((question) => question.id === id);

      state[targetIndex].answers = text;
    },
    setSingleInputSelectionAnswer: (
      state,
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      const answers = getTargetAnswers(state, action.payload.id);
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
      const targetAnswerItem = findTargetAnswerItem(state, action.payload);
      if (targetAnswerItem) {
        targetAnswerItem.isChecked = !targetAnswerItem.isChecked;
      }
    },
    setEtcText: (
      state: initialStateType[],
      action: PayloadAction<{ id: string; contentId: string; text: string }>
    ) => {
      const targetAnswerItem = findTargetAnswerItem(state, action.payload);
      if (targetAnswerItem) {
        targetAnswerItem.text = action.payload.text;
      }
    },
  },
});

export const {
  setInitialAnswer,
  setSentenceAnswer,
  setSingleInputSelectionAnswer,
  setCheckboxAnswer,
  setEtcText,
} = answerSlice.actions;

export default answerSlice.reducer;
