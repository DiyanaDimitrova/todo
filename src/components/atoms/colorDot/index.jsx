import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const ColorDot = ({ color, onClick }) => {
  return (
    <div
      data-testid={`color-dot-${color}`}  // Dynamically set the data-testid based on the color
      className={styles.dot}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
};

ColorDot.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired, // Ensure onClick is required
};

export default ColorDot;
