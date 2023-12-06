import React from 'react';
import styled from 'styled-components';
import { inputType } from '@store/types';
import { useAppSelector } from '@hooks/useAppSelector';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import AnswerFormContainer from './AnswerFormContainer';

const PurpleLine = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.purple};
  position: absolute;
  top: 0;
  left: 0;
`;

function Header() {
  const title = useAppSelector(
    (state) =>
      state.question.find((question) => question.id === inputType.title)?.title
  );

  const description = useAppSelector(
    (state) =>
      state.question.find((question) => question.id === inputType.title)
        ?.contents as string
  );

  const isExistRequired = useAppSelector((state) =>
    state.question.some((question) => question.isRequired)
  );

  return (
    <AnswerFormContainer id="title">
      <PurpleLine />
      <Typography variant="h4" sx={{ mb: '6px' }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: '6px' }}>
        {description}
      </Typography>
      {isExistRequired && (
        <>
          <Divider />
          <Typography
            variant="subtitle2"
            style={{ color: 'red', marginTop: '12px' }}
          >
            * 표시는 필수 질문임
          </Typography>
        </>
      )}
    </AnswerFormContainer>
  );
}

export default Header;
