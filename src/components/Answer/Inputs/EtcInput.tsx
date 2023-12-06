import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const EtcInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > span {
    width: 50px;
  }
`;

interface IEtcInputProps {
  textFieldValue: string;
  handleEtcTextFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string
  ) => void;
  contentId: string;
}

function EtcInput({
  textFieldValue,
  handleEtcTextFieldChange,
  contentId,
}: IEtcInputProps) {
  return (
    <EtcInputContainer>
      <span>기타:</span>
      <TextField
        style={{ width: '100%', minWidth: '368px' }}
        id="standard-search"
        type="search"
        variant="standard"
        value={textFieldValue}
        onChange={(e) => handleEtcTextFieldChange(e, contentId)}
      />
    </EtcInputContainer>
  );
}

export default EtcInput;
