import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import AnswerFormContainer from './AnswerFormContainer';
import { IContents } from '@store/types';
import { inputType as InputTypeAlias } from '@store/types';
import ShortAnswerInput from './Inputs/ShortAnswerInput';
import LongAnswerInput from './Inputs/LongAnswerInput';
import RadioInput from './Inputs/RadioInput';
import CheckboxInput from './Inputs/CheckboxInput';
import DropdownInput from './Inputs/DropdownInput';

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface IAnswerFormItemProps {
  id: string;
  title: string;
  inputType: string;
  isRequired: boolean;
  contents: string | IContents[];
}

function AnswerFormItem({
  id,
  title,
  inputType,
  isRequired,
  contents,
}: IAnswerFormItemProps) {
  console.log(contents);

  return (
    <AnswerFormContainer>
      <TitleContainer>
        <Typography variant="subtitle1">{title}</Typography>
        {isRequired && (
          <Typography variant="subtitle1" color="red">
            *
          </Typography>
        )}
      </TitleContainer>
      {inputType === InputTypeAlias.shortAnswer && <ShortAnswerInput />}
      {inputType === InputTypeAlias.longAnswer && <LongAnswerInput />}
      {inputType === InputTypeAlias.radio && (
        <RadioInput id={id} contents={contents as IContents[]} />
      )}
      {inputType === InputTypeAlias.checkbox && (
        <CheckboxInput id={id} contents={contents as IContents[]} />
      )}
      {inputType === InputTypeAlias.dropdown && (
        <DropdownInput id={id} contents={contents as IContents[]} />
      )}
    </AnswerFormContainer>
  );
}

export default AnswerFormItem;
