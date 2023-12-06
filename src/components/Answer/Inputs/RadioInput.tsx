import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { IContents } from '@store/types';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setSingleInputSelectionAnswer } from '@store/slices/answerSlice';
import EtcInput from './EtcInput';
import { useEtcAnswerInput } from '@hooks/useEtcAnswerInput';

interface IRadioInputProps {
  id: string;
  contents: IContents[];
}

function RadioInput({ id, contents }: IRadioInputProps) {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useAppDispatch();
  const { etcTextFieldValue, handleEtcTextFieldChange } = useEtcAnswerInput({
    id,
  });

  const handleRadioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    dispatch(setSingleInputSelectionAnswer({ id, contentId: e.target.value }));
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={handleRadioInput}
      >
        {contents.map((content) => (
          <FormControlLabel
            key={content.id}
            value={content.id}
            control={<Radio />}
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
      </RadioGroup>
    </FormControl>
  );
}

export default RadioInput;
