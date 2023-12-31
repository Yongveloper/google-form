import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import AnswerFormContainer from './AnswerFormContainer';
import { IMultipleAnswerType } from '@store/types';
import { inputType as InputTypeAlias } from '@store/types';
import RadioInput from './Inputs/RadioInput';
import CheckboxInput from './Inputs/CheckboxInput';
import DropdownInput from './Inputs/DropdownInput';
import AnswerTextFieldInput from './Inputs/AnswerTextFieldInput';

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
  answers: string | IMultipleAnswerType[];
}

function AnswerFormItem({
  id,
  title,
  inputType,
  isRequired,
  answers,
}: IAnswerFormItemProps) {
  return (
    <AnswerFormContainer id={id}>
      <TitleContainer>
        <Typography variant="subtitle1">{title}</Typography>
        {isRequired && (
          <Typography variant="subtitle1" color="red">
            *
          </Typography>
        )}
      </TitleContainer>
      {inputType === InputTypeAlias.shortAnswer && (
        <AnswerTextFieldInput
          id={id}
          width="50%"
          maxLength={15}
          placeholder="단답형"
        />
      )}
      {inputType === InputTypeAlias.longAnswer && (
        <AnswerTextFieldInput id={id} width="80%" placeholder="장문형" />
      )}
      {inputType === InputTypeAlias.radio && (
        <RadioInput id={id} contents={answers as IMultipleAnswerType[]} />
      )}
      {inputType === InputTypeAlias.checkbox && (
        <CheckboxInput id={id} contents={answers as IMultipleAnswerType[]} />
      )}
      {inputType === InputTypeAlias.dropdown && (
        <DropdownInput id={id} contents={answers as IMultipleAnswerType[]} />
      )}
    </AnswerFormContainer>
  );
}

export default React.memo(AnswerFormItem);
