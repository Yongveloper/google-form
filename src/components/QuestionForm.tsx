import React from 'react';
import styled from 'styled-components';
import {
  addInputItem,
  setInputType,
  setTitle,
} from '@store/slices/questionSlice';
import Box from '@mui/system/Box';
import FormContainer from './FormContainer';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { STextField } from './common/STextField.styles';

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

const AddItemBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;

  .AddItemBtn {
    margin-left: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.lightGrey};
    &:hover {
      cursor: pointer;
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    }
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

  const dispatch = useAppDispatch();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ id, contents: e.target.value }));
  };

  const handleInputType = (e: SelectChangeEvent) => {
    dispatch(setInputType({ id, contents: e.target.value }));
  };

  const handleAddInputItem = () => {
    if (Array.isArray(contents)) {
      dispatch(
        addInputItem({
          id,
          contentId: String(Date.now()),
          text: `옵션 ${contents.length + 1}`,
        })
      );
    }
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
              value={title}
              onChange={handleTitle}
            />
          )}
          {isFocused && (
            <FormControl sx={{ minWidth: 208 }}>
              <Select value={inputType} onChange={handleInputType}>
                <MenuItem value="shortAnswer">단답형</MenuItem>
                <MenuItem value="longAnswer">장문형</MenuItem>
                <MenuItem value="radio">객관식 질문</MenuItem>
                <MenuItem value="checkbox">체크박스</MenuItem>
                <MenuItem value="dropdown">드롭다운</MenuItem>
              </Select>
            </FormControl>
          )}
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
              <div className="input-items" key={index}>
                {inputType === 'radio' && <RadioButtonUncheckedIcon />}
                {inputType === 'checkbox' && <CropSquareIcon />}
                {inputType === 'dropdown' && <span>{index + 1}</span>}
                <STextField
                  id="standard-basic"
                  type="text"
                  variant="standard"
                  value={content.text}
                  onChange={handleTitle}
                />
              </div>
            ))}
          {isFocused &&
            {
              radio: (
                <AddItemBtnWrapper>
                  <RadioButtonUncheckedIcon />
                  <span className="AddItemBtn" onClick={handleAddInputItem}>
                    옵션 추가
                  </span>
                </AddItemBtnWrapper>
              ),
              checkbox: (
                <AddItemBtnWrapper>
                  <CropSquareIcon />
                  <span className="AddItemBtn" onClick={handleAddInputItem}>
                    옵션 추가
                  </span>
                </AddItemBtnWrapper>
              ),
              dropdown: (
                <AddItemBtnWrapper>
                  <span>{Array.isArray(contents) && contents.length + 1}</span>
                  <span className="AddItemBtn" onClick={handleAddInputItem}>
                    옵션 추가
                  </span>
                </AddItemBtnWrapper>
              ),
            }[inputType]}
        </ContentsContainer>
      </>
    </FormContainer>
  );
}

export default QuestionForm;
