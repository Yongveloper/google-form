import { IMultipleAnswerType } from '@store/types';
import Box from '@mui/system/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import { inputType } from '@store/types';

interface ICheckTypeItemProps {
  items: IMultipleAnswerType[];
  type: 'checkbox' | 'radio';
}

function CheckTypeItem({ items, type }: ICheckTypeItemProps) {
  const Control = type === inputType.checkbox ? Checkbox : Radio;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item) => (
        <FormControlLabel
          key={item.id}
          value={item.id}
          control={<Control />}
          label={item.text}
          disabled={!item.isChecked}
          checked={item.isChecked}
        />
      ))}
    </Box>
  );
}

export default CheckTypeItem;
