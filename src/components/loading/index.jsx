import React from 'react';
import styles from './index.module.css';

const Loading = () => (
  <div className={styles.container} aria-label="Loading...">
    <div className={styles.circle} />
  </div>
);

export default Loading;
