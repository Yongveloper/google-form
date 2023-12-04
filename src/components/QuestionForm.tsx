import React from 'react';
import styled from 'styled-components';
import { setInputType, setTitle } from '@store/slices/questionSlice';
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
    color: rgba(0, 0, 0, 0.38);
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

// const STextField = styled(TextField)`
//   width: 100%;
//   max-width: 446px;
//   input {
//     padding: 16px;
//   }
// `;

interface IQuestionFormProps {
  id: string;
}

function QuestionForm({ id }: IQuestionFormProps) {
  const question = useAppSelector((state) =>
    state.question.find((question) => question.id === id)
  );
  const dispatch = useAppDispatch();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ id, contents: e.target.value }));
  };

  const handleInputType = (e: SelectChangeEvent) => {
    dispatch(setInputType({ id, contents: e.target.value }));
  };

  return (
    <FormContainer id={id}>
      <>
        <TopContainer>
          {!question?.isFocused && <Box>{question?.title}</Box>}
          {question?.isFocused && (
            <STextField
              sx={{ maxWidth: '446px' }}
              inputProps={{ style: { padding: 16 } }}
              id="filled-search"
              type="search"
              variant="filled"
              value={question?.title}
              onChange={handleTitle}
            />
          )}
          {question?.isFocused && (
            <FormControl sx={{ minWidth: 208 }}>
              <Select value={question?.inputType} onChange={handleInputType}>
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
          {question?.inputType === 'shortAnswer' && (
            <div className="input__default short-textfield">단문형 텍스트</div>
          )}
          {question?.inputType === 'longAnswer' && (
            <div className="input__default long-textfield">장문형 텍스트</div>
          )}
          {Array.isArray(question?.contents) &&
            question?.contents.map((content, index) => (
              <div className="input-items" key={index}>
                {question?.inputType === 'radio' && (
                  <RadioButtonUncheckedIcon />
                )}
                {question?.inputType === 'checkbox' && <CropSquareIcon />}
                {question?.inputType === 'dropdown' && <span>{index + 1}</span>}

                <span>{content.text}</span>
              </div>
            ))}
        </ContentsContainer>
      </>
    </FormContainer>
  );
}

export default QuestionForm;
