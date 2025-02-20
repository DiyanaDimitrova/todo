import React from 'react';
import PropTypes from 'prop-types';
import { Button, AddTodo } from '..';
import { RESOLVE_ALL, UNRESOLVE_ALL, REMOVE_ALL } from '../../constants';
import styles from './index.module.css';

const Menu = ({
  resolveHandler,
  unResolveHandler,
  deleteHandler,
  addHandler,
  onInputChangeHandler,
  value,
}) => (
  <aside className={styles.menu}>
    <div className={styles.buttons}>
      <Button text={RESOLVE_ALL} onClick={resolveHandler} />
      <Button text={UNRESOLVE_ALL} onClick={unResolveHandler} />
      <Button text={REMOVE_ALL} onClick={deleteHandler} />
    </div>
    <AddTodo
      onClick={addHandler}
      onInputChange={onInputChangeHandler}
      value={value}
    />
  </aside>
);

Menu.propTypes = {
  resolveHandler: PropTypes.func.isRequired,
  unResolveHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  onInputChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Menu;
