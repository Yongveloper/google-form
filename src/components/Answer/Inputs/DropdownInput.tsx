import React from 'react';
import FormControl from '@mui/material/FormControl';
import { IContents } from '@store/types';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface IDropdownInputProps {
  id: string;
  contents: IContents[];
}

function DropdownInput({ id, contents }: IDropdownInputProps) {
  console.log(contents);

  return (
    <FormControl style={{ width: '176px' }}>
      <Select labelId="demo-simple-select-label" id="demo-simple-select">
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
