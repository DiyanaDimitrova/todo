import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todos from './index';

// Mock Functions
const mockDeleteTodoHandler = jest.fn();
const mockResolveSingleTodoHandler = jest.fn();
const mockOpenModal = jest.fn();
const mockSetSelectedTodo = jest.fn();

// Mock Data
const mockTodos = [
  {
    color: '',
    id: '1-delectus aut autem',
    isDone: false,
    isResolved: true,
    title: 'delectus aut autem',
  },
  {
    color: '',
    id: '2-quis ut nam facilis et officia qui',
    isDone: true,
    isResolved: false,
    title: 'quis ut nam facilis et officia qui',
  },
];

describe('Todos Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Todos
        todos={mockTodos}
        resolved={false}
        unresolved={false}
        deleteTodoHandler={mockDeleteTodoHandler}
        resolveSingleTodoHandler={mockResolveSingleTodoHandler}
        openModal={mockOpenModal}
        setSelectedTodo={mockSetSelectedTodo}
        selectedColor={null}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the correct number of todos', () => {
    render(
      <Todos
        todos={mockTodos}
        resolved={false}
        unresolved={false}
        deleteTodoHandler={mockDeleteTodoHandler}
        resolveSingleTodoHandler={mockResolveSingleTodoHandler}
        openModal={mockOpenModal}
        setSelectedTodo={mockSetSelectedTodo}
        selectedColor={null}
      />
    );
    expect(screen.getByText('delectus aut autem')).toBeInTheDocument();
    expect(
      screen.getByText('quis ut nam facilis et officia qui')
    ).toBeInTheDocument();
  });

  it('should filter resolved todos', () => {
    render(
      <Todos
        todos={mockTodos}
        resolved={true}
        unresolved={false}
        deleteTodoHandler={mockDeleteTodoHandler}
        resolveSingleTodoHandler={mockResolveSingleTodoHandler}
        openModal={mockOpenModal}
        setSelectedTodo={mockSetSelectedTodo}
        selectedColor={null}
      />
    );
    expect(screen.getByText('delectus aut autem')).toBeInTheDocument();
    expect(
      screen.queryByText('quis ut nam facilis et officia qui')
    ).not.toBeInTheDocument();
  });

  it('should filter unresolved todos', () => {
    render(
      <Todos
        todos={mockTodos}
        resolved={false}
        unresolved={true}
        deleteTodoHandler={mockDeleteTodoHandler}
        resolveSingleTodoHandler={mockResolveSingleTodoHandler}
        openModal={mockOpenModal}
        setSelectedTodo={mockSetSelectedTodo}
        selectedColor={null}
      />
    );
    expect(
      screen.queryByText('delectus aut autem')
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('quis ut nam facilis et officia qui')
    ).toBeInTheDocument();
  });

  it('should call deleteTodoHandler when delete button is clicked', () => {
    render(
      <Todos
        todos={mockTodos}
        resolved={false}
        unresolved={false}
        deleteTodoHandler={mockDeleteTodoHandler}
        resolveSingleTodoHandler={mockResolveSingleTodoHandler}
        openModal={mockOpenModal}
        setSelectedTodo={mockSetSelectedTodo}
        selectedColor={null}
      />
    );

    const deleteButton = screen.getAllByRole('button', {
      name: /delete/i,
    })[0];
    fireEvent.click(deleteButton);

    expect(mockDeleteTodoHandler).toHaveBeenCalledWith(
      '1-delectus aut autem'
    );
  });

  test('should call resolveSingleTodoHandler when resolve checkbox is clicked', () => {
    const resolveSingleTodoHandler = jest.fn();
  
    const todo = {
      id: 1,
      title: 'Test Todo',
      isResolved: false,
      color: 'red',
    };
  
    render(
      <Todos
        todos={[todo]}
        resolveSingleTodoHandler={resolveSingleTodoHandler}
        deleteTodoHandler={jest.fn()}
        openModal={jest.fn()}
        setSelectedTodo={jest.fn()}
        selectedColor=""
      />
    );
  
    // Locate the checkbox by its label
    const resolveCheckbox = screen.getByLabelText(/resolve/i); // Matches the label "Resolve"
  
    fireEvent.click(resolveCheckbox);  // Trigger checkbox click event
  
    // Verify if the handler was called
    expect(resolveSingleTodoHandler).toHaveBeenCalledWith(todo);
  });
  

  it('should open modal and set selected todo when adding color', () => {
    render(
      <Todos
        todos={mockTodos}
        resolved={false}
        unresolved={false}
        deleteTodoHandler={mockDeleteTodoHandler}
        resolveSingleTodoHandler={mockResolveSingleTodoHandler}
        openModal={mockOpenModal}
        setSelectedTodo={mockSetSelectedTodo}
        selectedColor={null}
      />
    );

    const addColorButton = screen.getAllByRole('button', {
      name: /add color/i,
    })[0];
    fireEvent.click(addColorButton);

    expect(mockOpenModal).toHaveBeenCalled();
    expect(mockSetSelectedTodo).toHaveBeenCalledWith(
      '1-delectus aut autem'
    );
  });
});
