import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import layer1 from '../assets/backgroundImgs/layer1.jpg';
import layer2 from '../assets/backgroundImgs/layer2.png';
import arena from '../assets/backgroundImgs/arena.png';
import food from '../assets/backgroundImgs/food.jpg';

import ParallaxSection from '../components/ParallaxSection/ParallaxSection';
import { Footer } from '../components/Footer/Footer';
import Button from '../components/UI/Button/Button';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import Modal from '../components/UI/Modal/Modal';
import InputField from '../components/UI/InputField/InputField';
import Reservations from '../components/Reservations/Reservations';

export function HomePage() {
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
      <Parallax pages={4} style={{ top: '0', left: '0' }}>
        <ParallaxLayer
          offset={0}
          speed={0.13}
          style={{
            backgroundImage: `url(${layer1})`,
            backgroundSize: 'cover',
            zIndex: 0,
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={0}
          style={{
            backgroundImage: `url(${layer2})`,
            backgroundSize: 'cover',
            zIndex: 1,
          }}
        ></ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.6} style={{ zIndex: 2 }}>
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h1 style={{ marginBottom: '0px' }}>Вітаємо у</h1>
            <p
              style={{
                color: '#ee931b',
                fontSize: '3rem',
                margin: '5px ',
                fontWeight: 'bold',
              }}
            >
              «БАР 100 РЕНТГЕН»
            </p>
            <h2 style={{ marginTop: '0px' }}>Проходь не затримуйся!</h2>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0}
          style={{ width: '50%', margin: '0 auto', padding: '50px', zIndex: 2 }}
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

          <div
            style={{ marginTop: '30px', fontSize: '1.2rem', color: '#fff4d6' }}
          >
            <h3>Умови резервації:</h3>
            <ul>
              <li>Резервацію можна здійснити за допомогою нашої платформи.</li>
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
              <li>
                Для скасування резервації звертайтесь заздалегідь через
                контактні канали.
              </li>
            </ul>
          </div>
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
          <div style={{ transform: 'translateY(-15%)' }}>
            <h1>
              НАША ГОРДІСТЬ - <span style={{ color: '#ee931b' }}>АРЕНА</span>
            </h1>
            <blockquote
              style={{
                marginTop: '1rem',
                padding: '1rem 1.5rem',
                borderLeft: '4px solid #ee931b',
                fontStyle: 'italic',
                fontSize: '1.3rem',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: '8px',
                color: '#ddd',
              }}
            >
              Якщо ви ще не були на Арені, я б рекомендував її – це хороший
              спосіб заробити гроші та показати всім, на що ви здатні. Не у всіх
              вистачає яєць битися з наступним монстром, і це дуже шкода!
              <p>– Володимер, наш вірний відвідувач</p>
            </blockquote>
            <p style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
              Aрена - розважальний заклад на території колинього заводу Росток
              (Бар в грі Тінь Чорнобиля Росток в грі Серце Чорнобиля). Тут
              проводяться бої між сталкерами в яких гравець може узяти участь. У
              грі Тінь Чорнобиля доступно 8 боїв, доступ до яких відкривається
              при підвищенні рангу гравця. У грі Серце Чорнобиля доступно 5
              боїв, доступ до яких відкривається при просуванні основним
              сюжетом. Винагорода за бої є грошовою, виключенням є фінальний бій
              у грі Серце Чорнобиля коли додатково дається унікальна зброя.
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button onClick={() => navigate('/arena')}>
                Дізнатися більше
              </Button>
            </div>
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
          <div
            id="menu"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '20px 10px 80px 30px',
              borderRadius: '20px',
              transform: 'translateY(-15%)',
            }}
          >
            <h2
              style={{
                textAlign: 'center',
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              МЕНЮ нашого бару
            </h2>

            <table
              border="1"
              cellpadding="10"
              cellspacing="0"
              style={{
                width: '90%',
                margin: '0 auto',
                backgroundColor: 'rgba(0, 0, 1)',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#ee931b', color: '#000000' }}>
                  <th>Блюдо</th>
                  <th>Ціна (грн)</th>
                  <th>Вміст</th>
                  <th>Вага</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#353535' }}>
                <tr>
                  <td>🥗 Салат "Бюрерова пастка"</td>
                  <td>120</td>
                  <td>Зелень, овочі, соус</td>
                  <td>250 г</td>
                </tr>
                <tr>
                  <td>🍝 Паста "Турби Снорка"</td>
                  <td>180</td>
                  <td>Паста, соус, морепродукти</td>
                  <td>300 г</td>
                </tr>
                <tr>
                  <td>🍖 Стейк з Плоті</td>
                  <td>350</td>
                  <td>М'ясо, спеції</td>
                  <td>350 г</td>
                </tr>
                <tr>
                  <td>🍰 Сирний пиріг</td>
                  <td>100</td>
                  <td>Сир, тісто</td>
                  <td>150 г</td>
                </tr>
                <tr>
                  <td>🍖 Ребра Ізлому</td>
                  <td>300</td>
                  <td>М'ясо ребер, спеції</td>
                  <td>400 г</td>
                </tr>
                <tr>
                  <td>🍨 Морозиво "Мозок Химери"</td>
                  <td>50</td>
                  <td>Молоко, цукор, ароматизатори</td>
                  <td>150 г</td>
                </tr>
                <tr>
                  <td>🍽 Апетайзер Полтергейста</td>
                  <td>100 (якщо замовлення на суму 1000 грн - БЕЗКОШТОВНО)</td>
                  <td>Сир, ковбаски, оливки</td>
                  <td>200 г</td>
                </tr>
                <tr>
                  <td>🥓 Кровянка "Кровосос"</td>
                  <td>30</td>
                  <td>М'ясо, кров, спеції</td>
                  <td>100 г</td>
                </tr>
                <tr>
                  <td>🍸 Горілка "Козаки"</td>
                  <td>БЕЗКОШТОВНО ДО КОЖНОГО ЗАМОВЛЕННЯ (крім десертів)</td>
                  <td>Алкоголь, трава</td>
                  <td>50 мл</td>
                </tr>
                <tr>
                  <td>🍲 Суп "Псевдогігант в болоті"</td>
                  <td>250</td>
                  <td>М'ясо, овочі, спеції</td>
                  <td>350 г</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ParallaxSection>

        <ParallaxLayer offset={3.6} speed={0}>
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
}
