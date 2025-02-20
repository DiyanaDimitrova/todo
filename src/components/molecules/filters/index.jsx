import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox, ColorDot, Button } from '../..';
import { CLEAR_FILTERS, FILTERS, MY_TASKS, RESOLVED, UNRESOLVED, COLORS } from '../../../constants';
import styles from './index.module.css';

const Filters = ({ setResolved, setUnresolved, setFilterColor, resolved, unresolved, dotColors }) => {
  // Function to clear all filters
  const clearFilters = () => {
    setResolved(false);
    setUnresolved(false);
    setFilterColor(false);
  };

  // Function to toggle filter options
  const toggleResolved = () => setResolved(prev => !prev);
  const toggleUnresolved = () => setUnresolved(prev => !prev);

  return (
    <div>
      <h2 className={styles.title}>{MY_TASKS}</h2>
      <div className={styles.filters}>
        <h4>{FILTERS}</h4>
        <Button onClick={clearFilters} text={CLEAR_FILTERS} />
      </div>
      <div className={styles.filter}>
        <CheckBox label={RESOLVED} checked={resolved} onChange={toggleResolved} />
        <CheckBox label={UNRESOLVED} checked={unresolved} onChange={toggleUnresolved} />
      </div>
      <div>
        <h5>{COLORS}</h5>
        <div className={styles.colorFilter}>
          {dotColors.map((color) => (
            <ColorDot key={color} color={color} onClick={() => setFilterColor(color)} />
          ))}
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  resolved: PropTypes.bool,
  unresolved: PropTypes.bool,
  dotColors: PropTypes.array.isRequired,
  setResolved: PropTypes.func.isRequired,
  setUnresolved: PropTypes.func.isRequired,
  setFilterColor: PropTypes.func.isRequired,
};

export default Filters;
