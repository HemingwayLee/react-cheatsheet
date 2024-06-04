import React from "react";
import styled from "@xstyled/styled-components";
import { colors } from "@atlaskit/theme";
import { borderRadius } from "../styles/constants";
import { Draggable } from "react-beautiful-dnd";
import { grid } from '../styles/constants';
import QuoteList from "../styles/list";
import Title from '../styles/title';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;

const Column = (props) => {
  const title = props.title;
  const quotes = props.quotes;
  const index = props.index;

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div style={{margin: `${grid}px`, display: "flex", flexDirection: "column"}} ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
            >
              {title}
            </Title>
          </Header>
          <QuoteList
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : null
            }}
            quotes={quotes}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Column;
