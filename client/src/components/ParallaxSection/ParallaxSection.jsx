import { ParallaxLayer } from '@react-spring/parallax';
import styles from './ParallaxSection.module.css';

function ParallaxSection({
  children,
  offset,
  backgroundImg,
  zValue,
  BgSpeedValue,
  customStyles = { height: '100vh', transform: 'translateY(-30%)' },
}) {
  return (
    <>
      <ParallaxLayer
        offset={offset}
        speed={BgSpeedValue}
        style={{ zIndex: zValue }}
      >
        <div
          style={{
            width: '100%',
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            ...customStyles,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          ></div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={offset} speed={0} style={{ zIndex: zValue }}>
        <div className={styles.container}>{children}</div>
      </ParallaxLayer>
    </>
  );
}

export default ParallaxSection;
