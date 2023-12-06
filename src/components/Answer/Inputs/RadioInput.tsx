import React, { useState } from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { IContents } from '@store/types';
import { STextField } from '@components/common/STextField.styles';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  setEtcText,
  setSingleInputSelectionAnswer,
} from '@store/slices/answerSlice';

const EtcInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > span {
    width: 50px;
  }
`;

interface IRadioInputProps {
  id: string;
  contents: IContents[];
}

function RadioInput({ id, contents }: IRadioInputProps) {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useAppDispatch();

  const handleEtcTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string
  ) => {
    const { value } = e.target;
    setTextFieldValue(value);
    dispatch(setEtcText({ id, contentId, text: value }));
  };

  const handleRadioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    dispatch(setSingleInputSelectionAnswer({ id, contentId: e.target.value }));
  };

  return (
    <FormControl style={{ width: '100%' }}>
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
                <EtcInputContainer>
                  <span>기타:</span>
                  <STextField
                    style={{ width: '100%', minWidth: '368px' }}
                    id="standard-search"
                    type="search"
                    variant="standard"
                    value={textFieldValue}
                    onChange={(e) => handleEtcTextFieldChange(e, content.id)}
                  />
                </EtcInputContainer>
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
