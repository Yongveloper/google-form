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
  .input__default {
    padding: 10px;
    color: ${({ theme }) => theme.colors.lightGrey};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }

  .short-textfield {
    width: 30%;
  }
  .long-textfield {
    width: 50%;
  }

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
            <div className="input__default short-textfield">단문형 텍스트</div>
          )}
          {inputType === 'longAnswer' && (
            <div className="input__default long-textfield">장문형 텍스트</div>
          )}
          {Array.isArray(contents) &&
            contents.map((content, index) => (
              <div className="input-items" key={index}>
                {inputType === 'radio' && <RadioButtonUncheckedIcon />}
                {inputType === 'checkbox' && <CropSquareIcon />}
                {inputType === 'dropdown' && <span>{index + 1}</span>}

                <span>{content.text}</span>
              </div>
            ))}
          {isFocused && (
            <AddItemBtnWrapper>
              {
                {
                  radio: <RadioButtonUncheckedIcon />,
                  checkbox: <CropSquareIcon />,
                  dropdown: (
                    <span>
                      {Array.isArray(contents) && contents.length + 1}
                    </span>
                  ),
                }[inputType]
              }
              <span className="AddItemBtn" onClick={handleAddInputItem}>
                옵션 추가
              </span>
            </AddItemBtnWrapper>
          )}
        </ContentsContainer>
      </>
    </FormContainer>
  );
}

export default QuestionForm;
