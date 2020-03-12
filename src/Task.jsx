import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import Styled from "styled-components";

const Container = Styled.div`
    background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
    border: 1px solid lightGray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    display: flex;
`;

const Handle = Styled.div`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: orange;
    margin-right: 8px;
`;

export default class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
          >
            <Handle {...provided.dragHandleProps} />
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
