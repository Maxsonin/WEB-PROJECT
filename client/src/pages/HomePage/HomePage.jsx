import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import layer1 from '../../assets/backgroundImgs/layer1.webp';
import layer2 from '../../assets/backgroundImgs/layer2.webp';
import arena from '../../assets/backgroundImgs/arena.webp';
import food from '../../assets/backgroundImgs/food.webp';

import styles from './HomePage.module.css';

import ParallaxSection from '../../components/ParallaxSection/ParallaxSection';
import { Footer } from '../../components/Footer/Footer';
import Button from '../../components/UI/Button/Button';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import Modal from '../../components/UI/Modal/Modal';
import InputField from '../../components/UI/InputField/InputField';
import Reservations from '../../components/Reservations/Reservations';

const HomePage = () => {
  const { isAuthenticated, isLoading, login } = useAuth();

  const [reservations, setReservations] = useState([]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/reservations', {
        withCredentials: true,
      });
      setReservations(res.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleLogin = async () => {
    await login({ phone_number: phoneNumber });
    setShowLoginModal(false);
    setPhoneNumber('');
    window.location.href = '/';
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <>
      <Parallax pages={3.9} style={{ top: '0', left: '0' }}>
        <ParallaxLayer
          offset={0}
          speed={0.13}
          style={{
            backgroundImage: `url(${layer1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={0}
          style={{
            backgroundImage: `url(${layer2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          }}
        ></ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.6} style={{ zIndex: 2 }}>
          <div className={styles.welcomeBox}>
            <h1>Вітаємо у </h1> <span>«БАР 100 РЕНТГЕН»</span>
            <p>Проходь не затримуйся!</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0}
          style={{ width: '80%', margin: '0 auto', padding: '50px', zIndex: 2 }}
        >
          <h1>Ваші зарезервовані столики:</h1>
          {isLoading ? (
            <p>Завантаження...</p>
          ) : (
            <>
              {!isAuthenticated && (
                <Button onClick={() => setShowLoginModal(true)}>Увійти</Button>
              )}
              {isAuthenticated && (
                <>
                  <Reservations
                    reservations={reservations}
                    setReservations={setReservations}
                  />
                </>
              )}
            </>
          )}
          {reservations.length <= 1 && (
            <div className={styles.rulesList}>
              <h3>Умови резервації:</h3>
              <ul>
                <li>Не більше 3 резервацій на людину</li>
                <li>
                  Вибір столика залежить від наявності та часу резервування.
                </li>
                <li>
                  Кількість відвідувачів має бути вказана під час створення
                  резервації.
                </li>
                <li>
                  Будь ласка, приходьте вчасно. У разі запізнення, столик може
                  бути передано іншим гостям.
                </li>
              </ul>
            </div>
          )}
        </ParallaxLayer>

        <ParallaxSection
          offset={2}
          backgroundImg={arena}
          BgSpeedValue={0.1}
          zValue={0}
          customStyles={{
            height: '80vh',
            transform: 'translateY(-30%)',
          }}
        >
          <div
            id="arena"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'translateY(-15%)',
            }}
          >
            <h1>
              НАША ГОРДІСТЬ - <span style={{ color: '#ee931b' }}>АРЕНА</span>
            </h1>
            <blockquote className={styles.arenaQuote}>
              Якщо ви ще не були на Арені, я б рекомендував її – це хороший
              спосіб заробити гроші та показати всім, на що ви здатні. Не у всіх
              вистачає яєць битися з наступним монстром, і це дуже шкода!
              <p>– Володимер, наш вірний відвідувач</p>
            </blockquote>
            <p className={styles.arenaDesc}>
              Aрена - розважальний заклад на території колинього заводу Росток
              (Бар в грі Тінь Чорнобиля Росток в грі Серце Чорнобиля). Тут
              проводяться бої між сталкерами в яких гравець може узяти участь. У
              грі Тінь Чорнобиля доступно 8 боїв, доступ до яких відкривається
              при підвищенні рангу гравця. У грі Серце Чорнобиля доступно 5
              боїв, доступ до яких відкривається при просуванні основним
              сюжетом. Винагорода за бої є грошовою, виключенням є фінальний бій
              у грі Серце Чорнобиля коли додатково дається унікальна зброя.
            </p>
            <Button onClick={() => navigate('/arena')}>Дізнатися більше</Button>
          </div>
        </ParallaxSection>

        <ParallaxSection
          offset={2.7}
          backgroundImg={food}
          BgSpeedValue={-0.05}
          zValue={-1}
          customStyles={{
            height: '100vh',
            transform: 'translateY(-25%)',
          }}
        >
          <div id="menu" className={styles.menuWrapper}>
            <h2>МЕНЮ нашого бару</h2>

            <table
              border="1"
              cellpadding="10"
              cellspacing="0"
              className={styles.menuTable}
            >
              <thead>
                <tr>
                  <th>Блюдо</th>
                  <th>Ціна (грн)</th>
                  <th>Вміст</th>
                  <th>Вага (г)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🥗 Салат "Бюрерова пастка"</td>
                  <td>120</td>
                  <td>Зелень, овочі, соус</td>
                  <td>250</td>
                </tr>
                <tr>
                  <td>🍝 Паста "Турби Снорка"</td>
                  <td>180</td>
                  <td>Паста, соус, морепродукти</td>
                  <td>300</td>
                </tr>
                <tr>
                  <td>🍖 Стейк з Плоті</td>
                  <td>350</td>
                  <td>М'ясо, спеції</td>
                  <td>350</td>
                </tr>
                <tr>
                  <td>🍰 Сирний пиріг</td>
                  <td>100</td>
                  <td>Сир, тісто</td>
                  <td>150</td>
                </tr>
                <tr>
                  <td>🍖 Ребра Ізлому</td>
                  <td>300</td>
                  <td>М'ясо ребер, спеції</td>
                  <td>400</td>
                </tr>
                <tr>
                  <td>🍨 Морозиво "Мозок Химери"</td>
                  <td>50</td>
                  <td>Молоко, цукор, ароматизатори</td>
                  <td>150</td>
                </tr>
                <tr>
                  <td>🍽 Апетайзер Полтергейста</td>
                  <td>100 </td>
                  <td>Сир, ковбаски, оливки</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td>🥓 Кровянка "Кровосос"</td>
                  <td>30</td>
                  <td>М'ясо, кров, спеції</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>🍸 Горілка "Козаки"</td>
                  <td>10</td>
                  <td>Алкоголь, трава</td>
                  <td>50 мл</td>
                </tr>
                <tr>
                  <td>🍲 Суп "Псевдогігант в болоті"</td>
                  <td>250</td>
                  <td>М'ясо, овочі, спеції</td>
                  <td>350</td>
                </tr>
              </tbody>
            </table>

            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                gap: '15px',
              }}
            >
              <li>
                Якщо замовлення на суму більше 1000 грн - АПЕТАЙЗЕР БЕЗКОШТОВНО
              </li>
              <li>
                ГОРІЛКА "Козаки" БЕЗКОШТОВНО ДО КОЖНОГО ЗАМОВЛЕННЯ (окрім
                десертів)
              </li>
            </ul>
          </div>
        </ParallaxSection>

        <ParallaxLayer offset={3.5} speed={0} style={{ zIndex: -99 }}>
          <Footer />
        </ParallaxLayer>
      </Parallax>

      {showLoginModal && (
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
          <Button onClick={() => setShowLoginModal(false)}>Скасувати</Button>
        </Modal>
      )}
    </>
  );
};

export default HomePage;
