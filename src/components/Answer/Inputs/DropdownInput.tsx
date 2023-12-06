import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { IContents } from '@store/types';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setSingleInputSelectionAnswer } from '@store/slices/answerSlice';

interface IDropdownInputProps {
  id: string;
  contents: IContents[];
}

function DropdownInput({ id, contents }: IDropdownInputProps) {
  const [selectedValue, setSelectedValue] = useState('선택');
  const dispatch = useAppDispatch();

  const handleDropdownInput = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedValue(value);
    dispatch(setSingleInputSelectionAnswer({ id, contentId: value }));
  };

  return (
    <FormControl style={{ width: '176px' }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        onChange={handleDropdownInput}
      >
        <MenuItem value="선택" disabled>
          선택
        </MenuItem>
        {contents.map((content) => (
          <MenuItem key={content.id} value={content.id}>
            {content.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropdownInput;
