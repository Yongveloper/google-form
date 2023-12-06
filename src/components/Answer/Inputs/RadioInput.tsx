import React from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { IContents } from '@store/types';
import { STextField } from '@components/common/STextField.styles';

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
  return (
    <FormControl style={{ width: '100%' }}>
      <RadioGroup
        aria-labelledby="buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
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
