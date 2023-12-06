import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import FormHeader from '@components/FormHeader';
import { useAppSelector } from '@hooks/useAppSelector';
import QuestionForm from '@components/QuestionForm';
import Sidebar from '@components/Sidebar';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { moveQuestion } from '@store/slices/questionSlice';
import { inputType } from '@store/types';

const QuestionList = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

function Form() {
  const questions = useAppSelector((state) => state.question).filter(
    (question) => question.id !== inputType.title
  );

  const dispatch = useAppDispatch();

  const handleOnDragEnd = ({ destination, source }: DropResult) => {
    // source: 드래그 시작된 곳
    // destination: 드롭된 곳
    if (!destination) return;
    if (source.index === destination.index) return;
    dispatch(
      moveQuestion({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  console.log(questions);

  return (
    <>
      <FormHeader />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          droppableId="questions"
          type="questions"
          direction="vertical"
        >
          {(provided) => (
            <QuestionList
              className="question-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {questions.map((question, index) => (
                <QuestionForm
                  key={question.id}
                  index={index}
                  id={question.id}
                />
              ))}
              {provided.placeholder}
            </QuestionList>
          )}
        </Droppable>
      </DragDropContext>
      <Sidebar />
    </>
  );
}

export default Form;
