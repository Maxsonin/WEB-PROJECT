import bar from '../../assets/imgs/bar.webp';
import styles from './AboutPage.module.css';
import { Footer } from '../../components/Footer/Footer';

const AboutPage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>БАР 100 РЕНТГЕН</h1>
        <div className={styles.content}>
          <p>
            Найвідоміший{' '}
            <span className={styles.highlight}>сталкерський бар</span>, про який
            чула вся Зона. Знаходиться на території бази угруповання{' '}
            <span className={styles.highlight}>«Борг»</span>, тож можна
            зрозуміти — не кожному відкрито вхід туди. Служить сталкерам одним
            із <span className={styles.highlight}>найбезпечніших місць</span> у
            Зоні.
            <br />
            <br />У «100 рентген» є <span className={styles.note}>
              охорона
            </span>{' '}
            та її часто відвідують різні сталкери. Бар знаходиться у підвалі, у
            підсобному дворі східної частини заводу{' '}
            <span className={styles.highlight}>«Росток»</span>. Біля входу
            гравця завжди зустрічає охоронець{' '}
            <span className={styles.person}>Жорік</span>.
            <br />
            <br />
            На території бару не можна ходити зі зброєю —{' '}
            <span className={styles.note}>правила безпеки суворі</span>. У
            приміщенні бару досить затишно і похмуро: барна стійка, за якою
            стежить <span className={styles.person}>Бармен</span>, і високі
            столи, у яких стоять сталкери.
            <br />
            <br />
            Праворуч за стійкою, трохи глибше біля стінки, стоїть{' '}
            <span className={styles.highlight}>інформатор</span> — джерело
            цінних відомостей про події в Зоні. А біля проходу в "особисті покої
            Бармена" стоїть ще один охоронець —{' '}
            <span className={styles.person}>Гарік</span>.
          </p>
          <img className={styles.img} src={bar} alt="Bar-img" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
