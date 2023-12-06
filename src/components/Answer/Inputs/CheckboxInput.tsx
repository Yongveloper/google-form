import React, { useState } from 'react';
import styled from 'styled-components';
import { IContents } from '@store/types';
import { STextField } from '@components/common/STextField.styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  setCheckboxAnswer,
  setCheckboxEtcAnswer,
} from '@store/slices/answerSlice';

const EtcInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > span {
    width: 50px;
  }
`;

interface ICheckboxInputProps {
  id: string;
  contents: IContents[];
}

function CheckboxInput({ id, contents }: ICheckboxInputProps) {
  const [textFieldValue, setTextFieldValue] = useState('');
  const dispatch = useAppDispatch();

  const handleEtcTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string
  ) => {
    e.stopPropagation();
    setTextFieldValue(e.target.value);
    dispatch(setCheckboxEtcAnswer({ id, contentId, text: e.target.value }));
  };

  const handleCheckboxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    dispatch(setCheckboxAnswer({ id, contentId: e.target.value }));
  };

  return (
    <FormGroup style={{ width: '100%' }} onChange={handleCheckboxInput}>
      {contents.map((content) => (
        <FormControlLabel
          key={content.id}
          value={content.id}
          control={<Checkbox />}
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
    </FormGroup>
  );
}

export default CheckboxInput;
