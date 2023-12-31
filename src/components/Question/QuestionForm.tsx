import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import {
  addInputItem,
  changeItemContent,
  deleteInputItem,
  moveQuestionItem,
  setTitle,
} from '@store/slices/questionSlice';
import Box from '@mui/system/Box';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FormContainer from './FormContainer';
import { useAppDispatch } from '@hooks/useAppDispatch';
import InputTypeSelect from './InputTypeSelect';
import QuestionInputItem from './QuestionInputItem';
import AddItemButton from './AddItemButton';
import FormFooter from './FormFooter';
import { IQuestion, inputType as InputTypeAlias } from '@store/types';
import TextField from '@mui/material/TextField';

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ContentsContainer = styled.div``;

const SDragIndicatorIcon = styled(DragIndicatorIcon)`
  color: gray;
  opacity: 0;
  transform: rotate(90deg);
  margin-top: -24px;
`;

const DndButtonSection = styled.div`
  text-align: center;
  &:hover ${SDragIndicatorIcon} {
    opacity: 1;
  }
`;

interface QuestionFormProps {
  index: number;
  question: IQuestion;
}

function QuestionForm({ index, question }: QuestionFormProps) {
  const { id, isFocused, inputType, title, contents, isRequired } = question;

  const dispatch = useAppDispatch();

  const isExistEtc = useCallback(() => {
    if (Array.isArray(contents)) {
      return contents.some((content) => content.isEtc);
    }
    return false;
  }, [contents]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ id, contents: e.target.value }));
  };

  const handleChangeContents = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      contentId: string
    ) => {
      dispatch(changeItemContent({ id, contentId, text: e.target.value }));
    },
    [id, dispatch]
  );

  const handleAddInputItem = () => {
    if (Array.isArray(contents)) {
      dispatch(
        addInputItem({
          id,
          contentId: String(Date.now()),
          text: `옵션 ${isExistEtc() ? contents.length : contents.length + 1}`,
          isEtc: false,
        })
      );
    }
  };

  const handleAddInputEtcItem = () => {
    if (Array.isArray(contents)) {
      dispatch(
        addInputItem({
          id,
          contentId: String(Date.now()),
          text: '',
          isEtc: true,
        })
      );
    }
  };

  const handleDeleteInputItem = useCallback(
    (contentId: string) => {
      dispatch(deleteInputItem({ id, contentId }));
    },
    [id, dispatch]
  );

  const handleOnItemDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (source.index === destination.index) return;
    dispatch(
      moveQuestionItem({
        questionId: id,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.7 : 1,
          }}
        >
          <FormContainer id={id}>
            <>
              <DndButtonSection {...provided.dragHandleProps}>
                <SDragIndicatorIcon />
              </DndButtonSection>
              <TopContainer>
                {!isFocused && <Box>{title.length > 0 ? title : '질문'}</Box>}
                {isFocused && (
                  <TextField
                    sx={{ maxWidth: '446px', width: '100%' }}
                    inputProps={{ style: { padding: 16 } }}
                    id="filled-search"
                    placeholder="질문"
                    type="search"
                    variant="filled"
                    value={title}
                    onChange={handleTitle}
                  />
                )}
                {isFocused && <InputTypeSelect id={id} inputType={inputType} />}
              </TopContainer>
              <ContentsContainer>
                {inputType === 'shortAnswer' && (
                  <TextField
                    sx={{ width: '30%', mb: '44px' }}
                    id="standard-disabled"
                    variant="standard"
                    defaultValue="단답형 텍스트"
                    disabled={true}
                  />
                )}
                {inputType === 'longAnswer' && (
                  <TextField
                    sx={{ width: '80%', mb: '44px' }}
                    id="standard-disabled"
                    defaultValue="장문형 텍스트"
                    variant="standard"
                    disabled={true}
                  />
                )}
                {Array.isArray(contents) && (
                  <DragDropContext onDragEnd={handleOnItemDragEnd}>
                    <Droppable
                      droppableId={id}
                      type="contents"
                      direction="vertical"
                    >
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {contents.map((content, index) => (
                            <QuestionInputItem
                              key={content.id}
                              index={index}
                              inputType={inputType}
                              contentsLength={contents.length}
                              content={content}
                              handleChangeContents={handleChangeContents}
                              handleDeleteInputItem={handleDeleteInputItem}
                              isFocused={isFocused}
                              isExistEtc={isExistEtc}
                            />
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
                {isFocused &&
                  inputType !== InputTypeAlias.shortAnswer &&
                  inputType !== InputTypeAlias.longAnswer && (
                    <AddItemButton
                      inputType={inputType}
                      contentsLength={
                        Array.isArray(contents) ? contents.length : 0
                      }
                      handleAddInputItem={handleAddInputItem}
                      handleAddInputEtcItem={handleAddInputEtcItem}
                      isExistEtc={isExistEtc}
                    />
                  )}
              </ContentsContainer>
              {isFocused && <FormFooter id={id} isRequired={isRequired} />}
            </>
          </FormContainer>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(QuestionForm);
