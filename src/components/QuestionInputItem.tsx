import React from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { STextField } from './common/STextField.styles';
import { IContents } from '@store/types';

interface IQuestionInputItemProps {
  index: number;
  inputType: string;
  contentsLength: number;
  content: IContents;
  handleChangeContents: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    contentId: string
  ) => void;
  handleDeleteInputItem: (contentId: string) => void;
  isExistEtc: () => boolean;
  isFocused: boolean;
}

function QuestionInputItem({
  index,
  inputType,
  contentsLength,
  content,
  handleChangeContents,
  handleDeleteInputItem,
  isExistEtc,
  isFocused,
}: IQuestionInputItemProps) {
  return (
    <div className="input-items" key={content.id}>
      {inputType === 'radio' && <RadioButtonUncheckedIcon />}
      {inputType === 'checkbox' && <CropSquareIcon />}
      {inputType === 'dropdown' && <span>{index + 1}</span>}
      {content.isEtc ? (
        <STextField
          id="standard-basic"
          type="text"
          variant="standard"
          placeholder="기타.."
          value="기타.."
          disabled={true}
        />
      ) : (
        <STextField
          id="standard-basic"
          type="text"
          variant="standard"
          value={content.text}
          onChange={(e) => handleChangeContents(e, content.id)}
        />
      )}
      {isFocused &&
        ((contentsLength === 2 && (content.isEtc || !isExistEtc())) ||
          contentsLength >= 3) && (
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteInputItem(content.id)}
          >
            <ClearIcon />
          </IconButton>
        )}
    </div>
  );
}

export default QuestionInputItem;
