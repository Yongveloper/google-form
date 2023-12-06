import { useAppSelector } from '@hooks/useAppSelector';
import React from 'react';

function ViewForm() {
  const questions = useAppSelector((state) => state.question);
  console.log(questions);

  return <div>ViewForm</div>;
}

export default ViewForm;
