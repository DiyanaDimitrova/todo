import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addTodo,
  removeAllTodos,
  removeTodo,
  resolveAllTodos,
  unresolveAllTodos,
  getTodos,
  editTodo,
} from '../redux/slices/todo';
import { MESSAGE_EMPTY_INPUT, WHITE_COLOR } from '../constants';

// Helper function to dispatch actions with event prevention
const handleDispatch = (dispatch, action) => (e) => {
  e?.preventDefault();
  dispatch(action());
};

export const useUtils = (value, todos, setValue) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resolveHandler = useCallback(
    handleDispatch(dispatch, resolveAllTodos),
    [dispatch],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unResolveHandler = useCallback(
    handleDispatch(dispatch, unresolveAllTodos),
    [dispatch],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteHandler = useCallback(handleDispatch(dispatch, removeAllTodos), [
    dispatch,
  ]);

  const addHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (value) {
        dispatch(
          addTodo({
            id: `${todos.length}-${value}`,
            title: value,
            isDone: false,
            isResolved: false,
            color: WHITE_COLOR,
          }),
        );
        setValue('');
      } else {
        alert(MESSAGE_EMPTY_INPUT);
      }
    },
    [dispatch, value, todos.length, setValue],
  );

  const deleteTodoHandler = useCallback(
    (id) => {
      dispatch(removeTodo(id));
    },
    [dispatch],
  );

  const getAllTodos = useCallback(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const resolveSingleTodoHandler = useCallback(
    (todo) => {
      dispatch(editTodo({ ...todo, isResolved: !todo.isResolved }));
    },
    [dispatch],
  );

  return {
    resolveHandler,
    unResolveHandler,
    deleteTodoHandler,
    deleteHandler,
    addHandler,
    getAllTodos,
    resolveSingleTodoHandler,
  };
};
