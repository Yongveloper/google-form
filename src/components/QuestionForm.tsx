import React from 'react';
import styled from 'styled-components';
import {
  addInputItem,
  changeItemContent,
  deleteInputItem,
  setTitle,
} from '@store/slices/questionSlice';
import Box from '@mui/system/Box';
import FormContainer from './FormContainer';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { STextField } from './common/STextField.styles';
import InputTypeSelect from './InputTypeSelect';
import QuestionInputItem from './QuestionInputItem';
import AddItemButton from './AddItemButton';
import FormFooter from './FormFooter';

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ContentsContainer = styled.div`
  .input-items {
    height: 48px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

interface IQuestionFormProps {
  id: string;
}

function QuestionForm({ id }: IQuestionFormProps) {
  const isFocused = useAppSelector(
    (state) => state.question.find((question) => question.id === id)?.isFocused
  );

  const inputType = useAppSelector(
    (state) =>
      state.question.find((question) => question.id === id)?.inputType as string
  );

  const title = useAppSelector(
    (state) => state.question.find((question) => question.id === id)?.title
  );

  const contents = useAppSelector(
    (state) => state.question.find((question) => question.id === id)?.contents
  );

  const isExistEtc = () => {
    if (Array.isArray(contents)) {
      return contents.some((content) => content.isEtc);
    }
    return false;
  };

  const dispatch = useAppDispatch();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ id, contents: e.target.value }));
  };

  const handleChangeContents = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string
  ) => {
    dispatch(changeItemContent({ id, contentId, text: e.target.value }));
  };

  const handleAddInputItem = () => {
    if (Array.isArray(contents)) {
      dispatch(
        addInputItem({
          id,
          contentId: String(Date.now()),
          text: `옵션 ${isExistEtc() ? contents.length : contents.length + 1}`,
          isEtc: false,
        })
      );
    }
  };

  const handleAddInputEtcItem = () => {
    if (Array.isArray(contents)) {
      dispatch(
        addInputItem({
          id,
          contentId: String(Date.now()),
          text: `기타..`,
          isEtc: true,
        })
      );
    }
  };

  const handleDeleteInputItem = (contentId: string) => {
    dispatch(deleteInputItem({ id, contentId }));
  };

  return (
    <FormContainer id={id}>
      <>
        <TopContainer>
          {!isFocused && <Box>{title}</Box>}
          {isFocused && (
            <STextField
              sx={{ maxWidth: '446px' }}
              inputProps={{ style: { padding: 16 } }}
              id="filled-search"
              type="search"
              variant="filled"
              placeholder="질문"
              value={title}
              onChange={handleTitle}
            />
          )}
          {isFocused && <InputTypeSelect id={id} inputType={inputType} />}
        </TopContainer>
        <ContentsContainer>
          {inputType === 'shortAnswer' && (
            <STextField
              sx={{ width: '30%' }}
              id="standard-search"
              type="search"
              variant="standard"
              defaultValue="단답형 텍스트"
              disabled={true}
            />
          )}
          {inputType === 'longAnswer' && (
            <STextField
              sx={{ width: '50%' }}
              id="standard-search"
              type="search"
              variant="standard"
              defaultValue="장문형 텍스트"
              disabled={true}
            />
          )}
          {Array.isArray(contents) &&
            contents.map((content, index) => (
              <QuestionInputItem
                key={content.id}
                index={index}
                inputType={inputType}
                contentsLength={contents.length}
                content={content}
                handleChangeContents={handleChangeContents}
                handleDeleteInputItem={handleDeleteInputItem}
                isExistEtc={isExistEtc}
              />
            ))}
          {isFocused &&
            inputType !== 'shortAnswer' &&
            inputType !== 'longAnswer' && (
              <AddItemButton
                inputType={inputType}
                contentsLength={Array.isArray(contents) ? contents.length : 0}
                handleAddInputItem={handleAddInputItem}
                handleAddInputEtcItem={handleAddInputEtcItem}
                isExistEtc={isExistEtc}
              />
            )}
        </ContentsContainer>
        {isFocused && <FormFooter id={id} />}
      </>
    </FormContainer>
  );
}

export default QuestionForm;
