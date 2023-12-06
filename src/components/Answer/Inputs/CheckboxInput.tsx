import React from 'react';
import styled from 'styled-components';
import { IContents } from '@store/types';
import { STextField } from '@components/common/STextField.styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
  console.log(contents);

  return (
    <FormGroup style={{ width: '100%' }}>
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
