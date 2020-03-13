import React from "react";
import "reset-css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Styled from "styled-components";

import initialData from "./initial-data";
import Column from "./Column";

const Container = Styled.div`
    display: flex;
`;

class App extends React.Component {
  state = initialData;

  //   onDragStart = result => {
  //     console.log("on drag start", result);
  //     document.body.style.color = "orange";
  //     document.body.style.transition = "background-color o.2s ease-in-out";
  //   };

  //   onDragUpdate = result => {
  //     const { destination, source } = result;
  //     let opacityValue = destination
  //       ? destination.index / Object.keys(this.state.tasks).length
  //       : 0;
  //     document.body.style.backgroundColor = `rgba(144, 238, 144, ${opacityValue})`;
  //   };

  //   onDragStart = start => {
  //     const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

  //     this.setState({ homeIndex });
  //   };

  onDragEnd = result => {
    // this.setState({ homeIndex: null });
    //
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = [...this.state.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };

      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    if (start === foreign) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
    }

    // moving from one column to another
    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const foreignTaskIds = [...foreign.taskIds];
    foreignTaskIds.splice(destination.index, 0, draggableId);

    const newforeign = {
      ...foreign,
      taskIds: foreignTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newforeign.id]: newforeign
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        // onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId="allColumns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map(
                  taskId => this.state.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;
