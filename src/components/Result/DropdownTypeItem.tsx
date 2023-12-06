import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface IDropdownTypeItemProps {
  text: string;
}

function DropdownTypeItem({ text }: IDropdownTypeItemProps) {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      disabled
      value={text}
    >
      <MenuItem value={text} disabled>
        {text}
      </MenuItem>
    </Select>
  );
}

export default DropdownTypeItem;
