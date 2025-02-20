import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { CheckBox, Button } from '../..';
import styles from './index.module.css';
import { ADD_COLOR, DELETE, RESOLVE, WHITE_COLOR, DONE } from '../../../constants';

const Todo = ({
  text,
  onDelete,
  isResolved,
  onResolveSingleTodo,
  color = WHITE_COLOR,
  onAddColor,
}) => {
  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <div className={styles.container} style={{ background: color }}>
      <div className={styles.text}>{text}</div>

      <div className={styles.checkbox}>
        <CheckBox
          label={RESOLVE}
          checked={isResolved}
          onChange={onResolveSingleTodo}
          aria-label="Resolve Todo"
        />
        {isResolved && <div className={styles.done}>{DONE}</div>}
      </div>

      <div className={styles.buttons}>
        <Button text={ADD_COLOR} onClick={onAddColor} aria-label="Add Color" />
        <Button text={DELETE} onClick={handleDelete} aria-label="Delete Todo" />
      </div>
    </div>
  );
};

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  isResolved: PropTypes.bool.isRequired,
  onResolveSingleTodo: PropTypes.func.isRequired,
  color: PropTypes.string,
  onAddColor: PropTypes.func.isRequired,
};

export default React.memo(Todo);
