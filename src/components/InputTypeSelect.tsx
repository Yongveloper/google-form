import React from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setInputType } from '@store/slices/questionSlice';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ShortTextIcon from '@mui/icons-material/ShortText';
import NotesIcon from '@mui/icons-material/Notes';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import Divider from '@mui/material/Divider';
import { inputType as InputTypeAlias } from '@store/types';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

interface IInputTypeSelectProps {
  id: string;
  inputType: string;
}

function InputTypeSelect({ id, inputType }: IInputTypeSelectProps) {
  const dispatch = useAppDispatch();

  const handleInputType = (e: SelectChangeEvent) => {
    dispatch(setInputType({ id, contents: e.target.value }));
  };
  return (
    <FormControl sx={{ minWidth: 208 }}>
      <Select value={inputType} onChange={handleInputType}>
        <MenuItem value={InputTypeAlias.shortAnswer}>
          <ItemContainer>
            <ShortTextIcon style={{ color: 'grey' }} />
            단답형
          </ItemContainer>
        </MenuItem>

        <MenuItem value={InputTypeAlias.longAnswer}>
          <ItemContainer>
            <NotesIcon style={{ color: 'grey' }} />
            장문형
          </ItemContainer>
        </MenuItem>
        <Divider />
        <MenuItem value={InputTypeAlias.radio}>
          <ItemContainer>
            <RadioButtonCheckedIcon style={{ color: 'grey' }} />
            객관식 질문
          </ItemContainer>
        </MenuItem>
        <MenuItem value={InputTypeAlias.checkbox}>
          <ItemContainer>
            <CheckBoxOutlinedIcon style={{ color: 'grey' }} />
            체크박스
          </ItemContainer>
        </MenuItem>
        <MenuItem value={InputTypeAlias.dropdown}>
          <ItemContainer>
            <ArrowDropDownCircleOutlinedIcon style={{ color: 'grey' }} />
            드롭다운
          </ItemContainer>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default InputTypeSelect;
