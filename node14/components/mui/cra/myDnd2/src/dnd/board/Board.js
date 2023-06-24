import React, { useState } from "react";
import styled from "@xstyled/styled-components";
import { colors } from "@atlaskit/theme";
import PropTypes from "prop-types";
import Column from "./Column";
import EmptyColumn from "./EmptyColumn"
import reorder, { reorderQuoteMap } from "../reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ColumnNameDialog from '../popups/columnEditor';

const Container = styled.div`
  background-color: ${colors.B100};
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

const Board = ({
  isCombineEnabled,
  initial,
  useClone,
  containerHeight,
  withScrollableColumns
}) => {
  console.log(initial)
  console.log(Object.keys(initial))

  const [columns, setColumns] = useState(initial);
  const [ordered, setOrdered] = useState(Object.keys(initial));

  const [settingsOpen, setSettingsOpen] = useState(false);
  const columnNameRef = React.useRef(null);

  const handleSettingsOpen = (title) => {
    columnNameRef.current.setWordingsFromParent(title)
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];

      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved
      };
      setColumns(orderedColumns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const reorderedorder = reorder(ordered, source.index, destination.index);

      setOrdered(reorderedorder);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination
    });

    setColumns(data.quoteMap);
  };

  const addColumn = () => {
    const tmpCol = {
      ...columns,
      "AAA": []
    };
    
    let tmpOrdered = [...ordered]
    tmpOrdered.push("AAA")

    setColumns(tmpCol);
    setOrdered(tmpOrdered);
  }

  return (
    
    <>
      <IconButton aria-label="add" onClick={addColumn}>
        <AddIcon fontSize="inherit" />
      </IconButton>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          ignoreContainerClipping={Boolean(containerHeight)}
          isCombineEnabled={isCombineEnabled}
        >
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {ordered.map((key, index) => (
                <Column
                  key={key}
                  index={index}
                  title={key}
                  handleSettingsOpen={handleSettingsOpen}
                  quotes={columns[key]}
                  isScrollable={withScrollableColumns}
                  isCombineEnabled={isCombineEnabled}
                  useClone={useClone}
                />
              ))}
              {provided.placeholder}
              {/* <EmptyColumn /> */}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      
      <ColumnNameDialog 
        ref={columnNameRef}
        onClose={handleSettingsClose} 
        open={settingsOpen} 
      />
    </>
  );
};

Board.defaultProps = {
  isCombineEnabled: false
};

Board.propTypes = {
  isCombineEnabled: PropTypes.bool
};

export default Board;
