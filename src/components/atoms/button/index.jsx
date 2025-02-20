import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const Button = ({ text, onClick, type = 'button' }) => (
  <button className={styles.button} onClick={onClick} type={type}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,  // Make text required
  onClick: PropTypes.func.isRequired, // Make onClick required
  type: PropTypes.string,             // type is optional, defaults to 'button'
};

export default Button;
