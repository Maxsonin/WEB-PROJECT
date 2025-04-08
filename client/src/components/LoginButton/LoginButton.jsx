import axios from 'axios';
import Modal from '../Modal/Modal';
import { useState } from 'react';

export default function LoginButton({ onLoginSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    axios
      .post(
        'http://localhost:8080/api/auth/login',
        { phone_number: phoneNumber },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.user_id) {
          setShowModal(false);
          onLoginSuccess();
        } else {
          alert(res.error);
        }
      })
      .catch((err) => {
        alert(err.error);
      });
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Увійти</button>;
      {showModal && (
        <Modal>
          <input
            type="text"
            placeholder="+380..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Вхід...' : 'Увійти'}
          </button>
          <button onClick={() => setShowModal(false)}>Скасувати</button>
        </Modal>
      )}
    </>
  );
}
