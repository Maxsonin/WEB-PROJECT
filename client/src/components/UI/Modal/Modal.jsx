import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.getElementById('root')
  );
};

export default Modal;
