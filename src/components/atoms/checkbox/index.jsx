import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className={styles.checkBoxWrapper}>
      <label htmlFor={label} className={styles.label}>
        <input
          id={label} // Added id to link with label for better accessibility
          className={styles.input}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,  // Made label required to ensure a proper label for accessibility
  checked: PropTypes.bool.isRequired,  // Made checked required for consistent state handling
  onChange: PropTypes.func.isRequired, // Made onChange required to handle state change
};

export default Checkbox;
