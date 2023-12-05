import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CropSquareIcon from '@mui/icons-material/CropSquare';

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

interface IAddItemButtonProps {
  inputType: string;
  contentsLength: number;
  handleAddInputItem: () => void;
  handleAddInputEtcItem: () => void;
  isExistEtc: () => boolean;
}

function AddItemButton({
  inputType,
  contentsLength,
  handleAddInputItem,
  handleAddInputEtcItem,
  isExistEtc,
}: IAddItemButtonProps) {
  return (
    <AddItemBtnContainer>
      {inputType === 'radio' && <RadioButtonUncheckedIcon />}
      {inputType === 'checkbox' && <CropSquareIcon />}
      {inputType === 'dropdown' && <span>{contentsLength + 1}</span>}
      <span className="AddItemBtn" onClick={handleAddInputItem}>
        옵션 추가
      </span>
      {(inputType === 'radio' || inputType === 'checkbox') && !isExistEtc() && (
        <>
          <span>또는</span>
          <Button sx={{ pt: '10px' }} onClick={handleAddInputEtcItem}>
            '기타' 추가
          </Button>
        </>
      )}
    </AddItemBtnContainer>
  );
}

export default AddItemButton;
