import React, { useState } from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { IContents } from '@store/types';
import { STextField } from '@components/common/STextField.styles';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setAnswer } from '@store/slices/answerSlice';

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

const ETC = 'Etc';

function RadioInput({ id, contents }: IRadioInputProps) {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useAppDispatch();

  const handleEtcTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // '기타'의 텍스트필드에 값을 입력하기 시작하면 '기타'를 선택
    if (selectedValue !== ETC) {
      setSelectedValue(ETC);
    }
    setTextFieldValue(value);
    dispatch(setAnswer({ id, text: value }));
  };

  const handleRadioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === ETC) {
      // '기타'를 체크했다면 '기타'의 텍스트필드에 입력한 값을 dispatch
      setSelectedValue(ETC);
      dispatch(setAnswer({ id, text: textFieldValue }));
    } else {
      setSelectedValue(value);
      const text = contents.find((content) => content.id === value)?.text ?? '';
      dispatch(setAnswer({ id, text }));
    }
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
            value={content.isEtc ? ETC : content.id}
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
                    onChange={handleEtcTextFieldChange}
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
