import styles from './ContainerElement.module.css';

function ContainerElement({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default ContainerElement;
