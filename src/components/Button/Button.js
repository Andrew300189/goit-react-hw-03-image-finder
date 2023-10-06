import React from 'react';
import styles from './Button.module.css';

const Button = ({ onLoadMore }) => (
  <button type="button" className={styles.loadMoreButton} onClick={onLoadMore}>
    Load more
  </button>
);

export default Button;