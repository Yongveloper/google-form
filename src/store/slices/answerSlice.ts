import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InputType, IQuestion } from '@store/types';

interface initialStateType {
  id: string;
  title: string;
  inputType: InputType;
  answers: string | [];
  isRequired: boolean;
}

const initialState: initialStateType[] = [];

const answerSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setInitialAnswer: (state, action: PayloadAction<IQuestion[]>) => {
      return action.payload.map((question) => ({
        id: question.id,
        title: question.title,
        inputType: question.inputType,
        answers: typeof question.contents === 'string' ? '' : [],
        isRequired: question.isRequired,
      }));
    },
    setTextFieldAnswer: (
      state: initialStateType[],
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const { id, text } = action.payload;
      const targetIndex = state.findIndex((question) => question.id === id);

      state[targetIndex].answers = text;
    },
  },
});

export const { setInitialAnswer, setTextFieldAnswer } = answerSlice.actions;

export default answerSlice.reducer;
