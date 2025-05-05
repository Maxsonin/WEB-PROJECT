import React from 'react';
import Button from '../../components/UI/Button/Button';
import arena from '../../assets/videos/arena.mp4';
import styles from './ArenaPage.module.css';

const ArenaPage = () => {
  return (
    <>
      <video
        className={`${styles.video} ${styles.fullscreen}`}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={arena} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`${styles.overlay} ${styles.fullscreen}`}></div>
      <div className={`${styles.content} ${styles.fullscreen}`}>
        <h1>
          Вітаємо на <span className={styles.span}>Арені</span>
        </h1>
        <p>
          Як випливає з назви, це місце, де сталкери борються один з одним за
          репутацію та гроші.
        </p>
        <Button>Взяти участь</Button>
      </div>
    </>
  );
};

export default ArenaPage;
