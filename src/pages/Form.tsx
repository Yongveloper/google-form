import React from 'react';
import styled from 'styled-components';
import FormHeader from '@components/FormHeader';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Form() {
  return (
    <Container>
      <FormHeader />
    </Container>
  );
}

export default Form;
