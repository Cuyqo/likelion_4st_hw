import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

// Global style
const GlobalStyle = createGlobalStyle`
  span {
    box-sizing: border-box;
  }
`;

// Styled components
const ContentBody = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 20px;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const ContentH1 = styled.h1`
  margin: 0;
  margin-bottom: 12px;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px;
  text-align: left;
  width: 100%;
  @media (max-width: 600px) {
    padding: 0;
  }
`;

const TodoItem = styled.li`
  padding: 10px 0;
  user-select: none;
  display: flex;
  align-items: center;
  &.complete {
    text-decoration: line-through;
    color: rgb(155, 155, 155);
  }
`;

const TodoButton = styled.button`
  width: 15px;
  height: 15px;
  background-color: #fff;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  position: relative;

  ${({ completed }) =>
    completed &&
    css`
      &::after {
        content: ' ';
        display: block;
        width: 5px;
        height: 10px;
        transform: translate(-2px, -2px) rotate(45deg);
        border-right: 2px solid #f1b116;
        border-bottom: 2px solid #f1b116;
      }
    `}
`;

const TodoContainer = styled.div`
  max-width: 400px;
  width: 100%;
  background-color: #4a65c7;
  text-align: center;
  padding: 20px;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const TodoInput = styled.input`
  width: calc(100% - 45px);
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const AddButton = styled.button`
  position: relative;
  width: 35px;
  height: 35px;
  border: none;
  background-color: #242423;
  border-radius: 4px;
  vertical-align: middle;

  span {
    display: block;
    font-size: 20px;
    width: 5px;
    height: 15px;
    position: absolute;
    top: 12%;
    left: 23%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const DeleteButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #242423;
  color: #fff;
  padding: 8px;
  width: 100%;
  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;

// TodoApp 컴포넌트
export function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const createTodo = () => {
    if (inputValue !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      createTodo();
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  return (
    <ContentBody>
      <GlobalStyle />
      <TodoContainer>
        <ContentH1>Todo List</ContentH1>
        <InputField>
          <TodoInput
            id="todoInput"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter a todo"
          />
          <AddButton id="addBtn" onClick={createTodo}>
            <span>+</span>
          </AddButton>
        </InputField>
        <TodoList id="todoList">
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              className={todo.completed ? 'complete' : ''}
              onDoubleClick={() => deleteTodo(index)}
            >
              <TodoButton
                completed={todo.completed}
                onClick={() => toggleComplete(index)}
              ></TodoButton>
              <span>{todo.text}</span>
            </TodoItem>
          ))}
        </TodoList>
        <DeleteButton onClick={deleteAllTodos}>Delete All</DeleteButton>
      </TodoContainer>
    </ContentBody>
  );
}
