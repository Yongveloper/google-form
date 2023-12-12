import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { useAppSelector } from '@hooks/useAppSelector';
import { IMultipleAnswerType } from '@store/types';
import { useEtcAnswerInput } from '@hooks/useEtcAnswerInput';

const EtcInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > span {
    width: 50px;
  }
`;

interface IEtcInputProps {
  answerId: string;
  contentId: string;
}

function EtcInput({ answerId, contentId }: IEtcInputProps) {
  const { handleEtcTextFieldChange } = useEtcAnswerInput({
    id: answerId,
  });

  const answer = useAppSelector(
    (state) => state.answer.find((answer) => answer.id === answerId)?.answers
  ) as IMultipleAnswerType[];
  const etcAnswerValue = answer?.find((answer) => answer.isEtc)?.text;

  return (
    <EtcInputContainer>
      <span>기타:</span>
      <TextField
        style={{ width: '100%', minWidth: '368px' }}
        id="standard-search"
        type="search"
        variant="standard"
        value={etcAnswerValue}
        onChange={(e) => handleEtcTextFieldChange(e, contentId)}
      />
    </EtcInputContainer>
  );
}

export default EtcInput;
