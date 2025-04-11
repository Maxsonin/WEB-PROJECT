import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import Button from '../UI/Button/Button';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useState } from 'react';
import Modal from '../UI/Modal/Modal';
import InputField from '../UI/InputField/InputField';

export function NavBar() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const handleLogin = async () => {
    await login({ phone_number: phoneNumber });
    setShowModal(false);
    window.location.href = '/';
  };

  return (
    <>
      <nav className={styles.nav}>
        <div>
          <Link to="/" className={styles.link}>
            Головна
          </Link>
          <Link to="/arena" className={styles.link}>
            Арена
          </Link>
          <Link to="/about" className={styles.link}>
            Про Нас
          </Link>
        </div>
        <div>
          {isLoading ? (
            <p>Завантаження...</p>
          ) : (
            <>
              {!isAuthenticated && (
                <Button onClick={() => setShowModal(true)}>Увійти</Button>
              )}
              {isAuthenticated && <Button onClick={handleLogout}>Вийти</Button>}
            </>
          )}
        </div>
      </nav>
      {showModal && (
        <Modal>
          <InputField
            type="text"
            placeholder="+380..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Вхід...' : 'Увійти'}
          </Button>
          <Button onClick={() => setShowModal(false)}>Скасувати</Button>
        </Modal>
      )}
    </>
  );
}
