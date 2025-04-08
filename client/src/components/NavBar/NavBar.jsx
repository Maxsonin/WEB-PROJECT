import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import LoginButton from '../LoginButton/LoginButton';
import axios from 'axios';

export function NavBar({ isAuthenticated, checkAuthAndLoadReservations }) {
  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:8080/api/auth/logout',
        {},
        { withCredentials: true }
      );
      checkAuthAndLoadReservations();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
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
        <a href="#events" className={styles.link}>
          Події
        </a>
        <a href="#menu" className={styles.link}>
          Меню
        </a>
      </div>
      <div>
        {!isAuthenticated && (
          <LoginButton onLoginSuccess={checkAuthAndLoadReservations} />
        )}
        {isAuthenticated && <button onClick={logout}>Вийти</button>}
      </div>
    </nav>
  );
}
