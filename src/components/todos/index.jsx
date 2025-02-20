import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Todo } from '..';

const Todos = ({
  todos = [],
  resolved = false,
  unresolved = false,
  deleteTodoHandler,
  resolveSingleTodoHandler,
  openModal,
  setSelectedTodo,
  selectedColor,
}) => {
  // Set the active todo and open the modal
  const setActiveTodo = useCallback(
    (id) => {
      openModal();
      setSelectedTodo(id);
    },
    [openModal, setSelectedTodo]
  );

  // Filter todos by resolved/unresolved status
  const filterByResolvedStatus = useCallback(
    (todo) => {
      if (resolved && unresolved) return true;
      if (resolved) return todo.isResolved;
      if (unresolved) return !todo.isResolved;
      return true;
    },
    [resolved, unresolved]
  );

  // Filter todos by selected color
  const filterByColor = useCallback(
    (todo) => {
      return selectedColor ? todo.color === selectedColor : true;
    },
    [selectedColor]
  );

  // Memoized filtered todos for performance
  const filteredTodos = useMemo(() => {
    return todos.filter(filterByResolvedStatus).filter(filterByColor);
  }, [todos, filterByResolvedStatus, filterByColor]);

  return (
    <>
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          text={todo.title}
          isResolved={todo.isResolved}
          isDone={todo.isDone}
          color={todo.color}
          onDelete={() => deleteTodoHandler(todo.id)}
          onResolveSingleTodo={() => resolveSingleTodoHandler(todo)}
          onAddColor={() => setActiveTodo(todo.id)}
        />
      ))}
    </>
  );
};

Todos.propTypes = {
  todos: PropTypes.array,
  resolved: PropTypes.bool,
  unresolved: PropTypes.bool,
  deleteTodoHandler: PropTypes.func.isRequired,
  resolveSingleTodoHandler: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  setSelectedTodo: PropTypes.func.isRequired,
  selectedColor: PropTypes.string,
};

export default Todos;
