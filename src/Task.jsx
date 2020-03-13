import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import Styled from "styled-components";

const Container = Styled.div`
    background-color: ${props =>
      props.isDragDisabled
        ? "lightgray"
        : props.isDragging
        ? "lightgreen"
        : "white"};
    border: 1px solid lightGray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    display: flex;
`;

export default class Task extends Component {
  render() {
    const isDragDisabled = this.props.task.id === "task-1";
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
