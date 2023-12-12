import React from 'react';
import { IMultipleAnswerType } from '@store/types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setCheckboxAnswer } from '@store/slices/answerSlice';
import EtcInput from './EtcInput';

interface ICheckboxInputProps {
  id: string;
  contents: IMultipleAnswerType[];
}

function CheckboxInput({ id, contents }: ICheckboxInputProps) {
  const dispatch = useAppDispatch();

  const handleCheckboxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCheckboxAnswer({ id, contentId: e.target.value }));
  };

  return (
    <FormGroup onChange={handleCheckboxInput}>
      {contents.map((content) => (
        <FormControlLabel
          key={content.id}
          value={content.id}
          control={<Checkbox />}
          checked={content.isChecked}
          label={
            content.isEtc ? (
              <EtcInput answerId={id} contentId={content.id} />
            ) : (
              content.text
            )
          }
        />
      ))}
    </FormGroup>
  );
}

export default CheckboxInput;
