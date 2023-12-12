import FormControl from '@mui/material/FormControl';
import { IMultipleAnswerType } from '@store/types';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setSingleInputSelectionAnswer } from '@store/slices/answerSlice';
import Divider from '@mui/material/Divider';
import { useAppSelector } from '@hooks/useAppSelector';
interface IDropdownInputProps {
  id: string;
  contents: IMultipleAnswerType[];
}

function DropdownInput({ id, contents }: IDropdownInputProps) {
  const answer = useAppSelector(
    (state) => state.answer.find((answer) => answer.id === id)?.answers
  ) as IMultipleAnswerType[];
  const checkedAnswer = answer.find((answer) => answer.isChecked);

  const dispatch = useAppDispatch();

  const handleDropdownInput = (event: SelectChangeEvent) => {
    const { value } = event.target;
    dispatch(setSingleInputSelectionAnswer({ id, contentId: value }));
  };

  return (
    <FormControl style={{ width: '176px' }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={checkedAnswer?.id ?? '선택'}
        onChange={handleDropdownInput}
      >
        <MenuItem value="선택" disabled>
          선택
        </MenuItem>
        <Divider />
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
