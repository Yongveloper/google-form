import React from 'react';
import { IContents } from '@store/types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setCheckboxAnswer } from '@store/slices/answerSlice';
import EtcInput from './EtcInput';
import { useEtcAnswerInput } from '@hooks/useEtcAnswerInput';

interface ICheckboxInputProps {
  id: string;
  contents: IContents[];
}

function CheckboxInput({ id, contents }: ICheckboxInputProps) {
  const { etcTextFieldValue, handleEtcTextFieldChange } = useEtcAnswerInput({
    id,
  });
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
          label={
            content.isEtc ? (
              <EtcInput
                textFieldValue={etcTextFieldValue}
                handleEtcTextFieldChange={handleEtcTextFieldChange}
                contentId={content.id}
              />
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
