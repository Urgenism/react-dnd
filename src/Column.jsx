import React from "react";
import Styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

const Container = Styled.div`
    background-color: white;
    margin: 8px;
    border: 1px solid lightGrey;
    border-radius: 2px;
    width: 250px;
    display: flex;
    flex-direction: column;
`;
const Title = Styled.h3`
    padding: 8px;
`;
const TaskList = Styled.div`
    flex-grow: 1;
    min-height: 100px;
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")}
`;

class Column extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {provided => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Title
              {...provided.dragHandleProps}
              onClick={console.log("clicked")}
            >
              {this.props.column.title}
            </Title>
            <Droppable
              droppableId={this.props.column.id}
              //   type={this.props.column.id === "column-3" ? "done" : "active"}
              isDropDisabled={this.props.isDropDisabled}
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Column;
