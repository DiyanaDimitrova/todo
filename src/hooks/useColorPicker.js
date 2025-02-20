import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { editTodo } from '../redux/slices/todo.js';
import { WHITE_COLOR } from '../constants';

export const useColorPicker = (selectedTodo, setSelectedTodo) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState(WHITE_COLOR);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  const addColorHandler = () => {
    dispatch(editTodo({ id: selectedTodo, color }));
    closeModal();
  };

  const openModal = useCallback(
    (todoId) => {
      setSelectedTodo(todoId);
      setIsOpen(true);
    },
    [setSelectedTodo],
  );

  const closeModal = () => {
    setIsOpen(false);
    setColor(WHITE_COLOR);
    setSelectedTodo(null);
  };

  return {
    color,
    isOpen,
    openModal,
    closeModal,
    handleColorChange,
    addColorHandler,
  };
};
