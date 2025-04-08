import React from 'react';
import styles from './Ad.module.css';

export function Ad({ imgSrc, title, description }) {
  return (
    <div className={styles.div}>
      <img src={imgSrc} alt={title} className={styles.img} />
      <h1 className={styles.h1}>{title}</h1>
      <p className={styles.p}>{description}</p>
    </div>
  );
}
