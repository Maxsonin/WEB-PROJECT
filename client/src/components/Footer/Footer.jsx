import React from 'react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <div className={styles.footer}>
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
              <a href="#">Email: email@example.com</a>
            </li>
            <li>
              <a href="#">Телефон: +123 456 789</a>
            </li>
            <li>
              <a href="#">Адреса: Вулиця, Місто</a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Підписка</h3>
          <p>Підписуйтеся на нашу розсилку для отримання новин та акцій!</p>
          <form>
            <input type="email" placeholder="Введіть ваш email" />
            <button type="submit">Підписатися</button>
          </form>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 Ваш ресторан. Усі права захищено.</p>
      </div>
    </div>
  );
}
