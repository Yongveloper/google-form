import React from 'react';
import { STextField } from '@components/common/STextField.styles';

function LongAnswerInput() {
  return (
    <STextField
      style={{ width: '80%', marginTop: '16px' }}
      id="standard-search"
      type="search"
      variant="standard"
      placeholder="장문형"
    />
  );
}

export default LongAnswerInput;
