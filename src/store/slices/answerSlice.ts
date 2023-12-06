import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { inputType, InputType, IQuestion } from '@store/types';

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

const findTargetAnswerItem = (
  state: initialStateType[],
  { id, contentId }: { id: string; contentId: string }
): CheckboxAnswerType | undefined => {
  const targetAnswers = state.find((question) => question.id === id)
    ?.answers as CheckboxAnswerType[];
  return targetAnswers.find((answer) => answer.id === contentId);
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
        answers:
          question.inputType === inputType.checkbox &&
          Array.isArray(question.contents)
            ? question.contents.map((content) => ({
                id: content.id,
                text: content.text,
                isChecked: false,
              }))
            : '',
        isRequired: question.isRequired,
      }));
    },
    setAnswer: (
      state: initialStateType[],
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const { id, text } = action.payload;
      const targetIndex = state.findIndex((question) => question.id === id);

      state[targetIndex].answers = text;
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
    setCheckboxEtcAnswer: (
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
  setAnswer,
  setCheckboxAnswer,
  setCheckboxEtcAnswer,
} = answerSlice.actions;

export default answerSlice.reducer;
