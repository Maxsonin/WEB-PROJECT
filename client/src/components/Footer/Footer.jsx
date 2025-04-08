import styles from './Footer.module.css';
import Button from '../UI/Button/Button';
import InputField from '../UI/InputField/InputField';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>Про нас</h3>
          <ul>
            <li>
              <a href="#">Про нас</a>
            </li>
            <li>
              <a href="#">Наша історія</a>
            </li>
            <li>
              <a href="#">Команда</a>
            </li>
            <li>
              <a href="#">Кар'єра</a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Меню</h3>
          <ul>
            <li>
              <a href="#">Головна</a>
            </li>
            <li>
              <a href="#">Меню</a>
            </li>
            <li>
              <a href="#">Контакти</a>
            </li>
            <li>
              <a href="#">Бронювання</a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Контакти</h3>
          <ul>
            <li>
              <a href="#">Email: 100rads.bar@gmail.com</a>
            </li>
            <li>
              <a href="#">Телефон: +132 256 839</a>
            </li>
            <li>
              <a href="#">Адреса: Барська 5, Чорнобиль</a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Підписка</h3>
          <p>Підписуйтеся на нашу розсилку для отримання новин та акцій!</p>
          <form>
            <InputField type="email" placeholder="Введіть ваш email" />
            <Button type="submit">Підписатися</Button>
          </form>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 Ваш ресторан. Усі права захищено.</p>
      </div>
    </footer>
  );
}
