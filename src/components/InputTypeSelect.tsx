import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setInputType } from '@store/slices/questionSlice';

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
        <MenuItem value="shortAnswer">단답형</MenuItem>
        <MenuItem value="longAnswer">장문형</MenuItem>
        <MenuItem value="radio">객관식 질문</MenuItem>
        <MenuItem value="checkbox">체크박스</MenuItem>
        <MenuItem value="dropdown">드롭다운</MenuItem>
      </Select>
    </FormControl>
  );
}

export default InputTypeSelect;
