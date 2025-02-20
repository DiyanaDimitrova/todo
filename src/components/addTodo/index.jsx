import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '..';
import { ADD_TODO } from '../../constants';
import styles from './index.module.css';

const AddTodo = ({ onClick, onInputChange, value }) => (
  <div className={styles.container}>
    <input
      className={styles.input}
      placeholder={ADD_TODO}
      value={value}
      onChange={onInputChange}
      type="text"  // Explicitly set the input type to text for clarity
    />
    <Button text={ADD_TODO} onClick={onClick} />
  </div>
);

AddTodo.propTypes = {
  onClick: PropTypes.func.isRequired,  // Marking onClick as required
  onInputChange: PropTypes.func.isRequired, // Marking onInputChange as required
  value: PropTypes.string.isRequired,  // Ensuring value is a string and required
};

export default AddTodo;
