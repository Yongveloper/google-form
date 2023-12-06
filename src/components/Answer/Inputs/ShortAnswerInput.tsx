import React from 'react';
import { STextField } from '@components/common/STextField.styles';

function ShortAnswerInput() {
  return (
    <STextField
      style={{ width: '50%', marginTop: '16px' }}
      id="standard-search"
      inputProps={{
        maxLength: 15,
      }}
      type="search"
      variant="standard"
      placeholder="단답형"
    />
  );
}

export default ShortAnswerInput;
