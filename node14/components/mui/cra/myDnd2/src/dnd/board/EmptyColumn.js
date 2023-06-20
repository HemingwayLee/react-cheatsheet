import React from "react";
import styled from "@xstyled/styled-components";
import { colors } from "@atlaskit/theme";
import { grid, borderRadius } from "../styles/constants";
// import { Draggable } from "react-beautiful-dnd";
// import QuoteList from "../styles/list";
import Title from "../styles/title";
import Button from '@mui/material/Button';

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;

const EmptyColumn = (props) => {
  // const title = props.title;
  // const quotes = props.quotes;
  // const index = props.index;

  const addColumn = () => {
    console.log("Add Column")
  }

  return (
    <Container >
      <Header isDragging={false}>
        <Title>
          <Button variant="outlined" onClick={addColumn}>
            Add New Column
          </Button>
          {/* <IconButton aria-label="edit">
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon fontSize="inherit" />
          </IconButton> */}
        </Title>
      </Header>
      <span style={{height: 750}}>
      </span>
    </Container>
  );
};

export default EmptyColumn;
