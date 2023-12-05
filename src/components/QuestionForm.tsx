import React from 'react';
import styled from 'styled-components';
import {
  addInputItem,
  changeItemContent,
  deleteInputItem,
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
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

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

const AddItemBtnContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 14px;

  .AddItemBtn {
    margin: 0 10px;
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

  const handleInputType = (e: SelectChangeEvent) => {
    dispatch(setInputType({ id, contents: e.target.value }));
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
                {content.isEtc ? (
                  <STextField
                    id="standard-basic"
                    type="text"
                    variant="standard"
                    placeholder="기타.."
                    value="기타.."
                    disabled={true}
                  />
                ) : (
                  <STextField
                    id="standard-basic"
                    type="text"
                    variant="standard"
                    value={content.text}
                    onChange={(e) => handleChangeContents(e, content.id)}
                  />
                )}
                {((contents.length === 2 && (content.isEtc || !isExistEtc())) ||
                  contents.length >= 3) && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteInputItem(content.id)}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </div>
            ))}
          {isFocused &&
            {
              radio: (
                <AddItemBtnContainer>
                  <RadioButtonUncheckedIcon />
                  <span className="AddItemBtn" onClick={handleAddInputItem}>
                    옵션 추가
                  </span>
                  {!isExistEtc() && (
                    <>
                      <span>또는</span>
                      <Button
                        sx={{ pt: '10px' }}
                        onClick={handleAddInputEtcItem}
                      >
                        '기타' 추가
                      </Button>
                    </>
                  )}
                </AddItemBtnContainer>
              ),
              checkbox: (
                <AddItemBtnContainer>
                  <CropSquareIcon />
                  <span className="AddItemBtn" onClick={handleAddInputItem}>
                    옵션 추가
                  </span>
                  {!isExistEtc() && (
                    <>
                      <span>또는</span>
                      <Button
                        sx={{ pt: '10px' }}
                        onClick={handleAddInputEtcItem}
                      >
                        '기타' 추가
                      </Button>
                    </>
                  )}
                </AddItemBtnContainer>
              ),
              dropdown: (
                <AddItemBtnContainer>
                  <span>{Array.isArray(contents) && contents.length + 1}</span>
                  <span className="AddItemBtn" onClick={handleAddInputItem}>
                    옵션 추가
                  </span>
                </AddItemBtnContainer>
              ),
            }[inputType]}
        </ContentsContainer>
      </>
    </FormContainer>
  );
}

export default QuestionForm;
