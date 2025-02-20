import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SketchPicker } from 'react-color';
import { Menu, Todos, Modal, Loading, Filters } from '../components';
import { useUtils } from '../hooks/useUtils';
import { useFilter } from '../hooks/useFilter';
import { useColorPicker } from '../hooks/useColorPicker';
import styles from './index.module.css';
import { PICK_COLOR } from '../constants';

// Main Component
const Page = () => {
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.isLoading);
  const [value, setValue] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);

  const {
    resolveHandler,
    unResolveHandler,
    deleteTodoHandler,
    deleteHandler,
    addHandler,
    getAllTodos,
    resolveSingleTodoHandler,
  } = useUtils(value, todos, setValue);

  const {
    color,
    isOpen,
    openModal,
    closeModal,
    handleColorChange,
    addColorHandler,
  } = useColorPicker(selectedTodo, setSelectedTodo);

  const {
    resolved,
    unresolved,
    setResolved,
    setUnresolved,
    dotColors,
    filterColor,
    setFilterColor,
  } = useFilter(todos);

  useEffect(() => {
    getAllTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        onAddColor={addColorHandler}
        header={PICK_COLOR}>
        <SketchPicker color={color} onChange={handleColorChange} />
      </Modal>

      <Menu
        resolveHandler={resolveHandler}
        unResolveHandler={unResolveHandler}
        deleteHandler={deleteHandler}
        addHandler={addHandler}
        onInputChangeHandler={(e) => setValue(e.target.value)}
        value={value}
      />

      <main className={styles.children}>
        <Filters
          resolved={resolved}
          unresolved={unresolved}
          setResolved={setResolved}
          setUnresolved={setUnresolved}
          setFilterColor={setFilterColor}
          dotColors={dotColors}
        />

        <Todos
          todos={todos}
          resolved={resolved}
          unresolved={unresolved}
          deleteTodoHandler={deleteTodoHandler}
          resolveSingleTodoHandler={resolveSingleTodoHandler}
          openModal={openModal}
          setSelectedTodo={setSelectedTodo}
          selectedColor={filterColor}
        />
      </main>
    </div>
  );
};

export default Page;
