import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { STextField } from '../common/STextField.styles';
import { IContents } from '@store/types';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { inputType as InputTypeAlias } from '@store/types';

const SDragIndicatorIcon = styled(DragIndicatorIcon)`
  opacity: 0;
  color: grey;
`;

const InputItemsContainer = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover ${SDragIndicatorIcon} {
    opacity: 1;
  }
`;

const DragButtonSection = styled.div<{ $isFocused: boolean }>`
  position: absolute;
  left: 4px;
  visibility: ${({ $isFocused }) => ($isFocused ? 'visible' : 'hidden')};
`;

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
    <Draggable draggableId={content.id} index={index}>
      {(provided: DraggableProvided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.7 : 1,
          }}
        >
          <InputItemsContainer>
            <DragButtonSection
              {...provided.dragHandleProps}
              $isFocused={isFocused}
            >
              <SDragIndicatorIcon />
            </DragButtonSection>
            {inputType === InputTypeAlias.radio && (
              <RadioButtonUncheckedIcon style={{ color: 'grey' }} />
            )}
            {inputType === InputTypeAlias.checkbox && (
              <CropSquareIcon style={{ color: 'grey' }} />
            )}
            {inputType === InputTypeAlias.dropdown && <span>{index + 1}</span>}
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
          </InputItemsContainer>
        </div>
      )}
    </Draggable>
  );
}

export default QuestionInputItem;
