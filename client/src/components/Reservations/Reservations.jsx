import styles from './Reservations.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../UI/Modal/Modal';
import InputField from '../UI/InputField/InputField';
import Button from '../UI/Button/Button';

function Reservations({ reservations, setReservations }) {
  const [currReservation, setCurrReservation] = useState(null);

  const [editModel, setEditModel] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [modalData, setModalData] = useState({
    datetime: '',
    table: '',
    numberOfVisitors: '',
  });

  const removeReservation = async (reservationId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/reservations/${reservationId}`,
        { withCredentials: true }
      );
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.reservation_id !== reservationId
        )
      );
    } catch (error) {
      console.error('Error removing reservation:', error);
    }
  };

  const updateReservation = async (e) => {
    e.preventDefault();
    const dataToSend = {
      start_time: modalData.datetime,
      table_id: modalData.table,
      number_of_visitors: modalData.numberOfVisitors,
    };

    try {
      const res = await axios.put(
        `http://localhost:8080/api/reservations/${currReservation.reservation_id}`,
        dataToSend,
        { withCredentials: true }
      );
      setEditModel(false);
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.reservation_id === currReservation.reservation_id
            ? res.data
            : reservation
        )
      );
    } catch (error) {
      console.error('Error updating reservation:', error);
    } finally {
      setModalData({
        datetime: '',
        table: '',
        numberOfVisitors: '',
      });
      setCurrReservation(null);
    }
  };

  const addReservation = async (e) => {
    e.preventDefault();
    const dataToSend = {
      start_time: modalData.datetime,
      table_id: modalData.table,
      number_of_visitors: modalData.numberOfVisitors,
    };

    try {
      const res = await axios.post(
        'http://localhost:8080/api/reservations',
        dataToSend,
        { withCredentials: true }
      );
      setAddModal(false);
      setReservations((prevReservations) => [...prevReservations, res.data]);
    } catch (error) {
      console.error('Error adding reservation:', error);
    } finally {
      setModalData({
        datetime: '',
        table: '',
        numberOfVisitors: '',
      });
    }
  };

  const formatDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (currReservation) {
      setModalData({
        datetime: formatDateTimeLocal(currReservation.start_time),
        table: currReservation.table_id,
        numberOfVisitors: currReservation.number_of_visitors,
      });
    }
  }, [currReservation]);

  return (
    <>
      <>
        <ol className={styles.ul}>
          {reservations.map((reservation) => (
            <li key={reservation.reservation_id}>
              <table
                border="1"
                cellpadding="10"
                cellspacing="0"
                className={styles.table}
              >
                <thead className={styles.thead}>
                  <tr>
                    <th>Номер столику</th>
                    <th>Кількість відвідувачів</th>
                    <th>Час</th>
                    <th>Дії</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  <tr>
                    <td>{reservation.table_id}</td>
                    <td>{reservation.number_of_visitors}</td>
                    <td>{formatDateTimeLocal(reservation.start_time)}</td>
                    <td>
                      <button
                        className={`${styles.button} ${styles.remove}`}
                        onClick={() =>
                          removeReservation(reservation.reservation_id)
                        }
                      >
                        Скасувати
                      </button>
                      <button
                        className={`${styles.button} ${styles.edit}`}
                        onClick={() => {
                          setEditModel(true);
                          setCurrReservation(reservation);
                        }}
                      >
                        Редагувати
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          ))}
        </ol>
        {reservations.length < 3 && (
          <Button onClick={() => setAddModal(true)}>Зробити резервацію</Button>
        )}
      </>

      {editModel && (
        <Modal>
          <form className={styles.form} onSubmit={updateReservation}>
            <label className={styles.label} htmlFor="datetime">
              Обрати дату та час:
            </label>
            <InputField
              type="datetime-local"
              id="datetime"
              name="datetime"
              value={modalData.datetime}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  datetime: e.target.value,
                })
              }
            />
            <label className={styles.label} htmlFor="table">
              Обрати столик:
            </label>
            <InputField
              type="number"
              id="table"
              name="table"
              min="1"
              max="10"
              value={modalData.table}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  table: e.target.value,
                })
              }
            />
            <label className={styles.label} htmlFor="numberOfVisitors">
              Кількість відвідувачів:
            </label>
            <InputField
              type="number"
              id="numberOfVisitors"
              name="numberOfVisitors"
              min="1"
              max="20"
              value={modalData.numberOfVisitors}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  numberOfVisitors: e.target.value,
                })
              }
            />
            <Button type="submit">Підтвердити</Button>
            <Button onClick={() => setEditModel(false)}>Скасувати</Button>
          </form>
        </Modal>
      )}
      {addModal && (
        <Modal>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            onSubmit={addReservation}
          >
            <label htmlFor="datetime">Обрати дату та час:</label>
            <InputField
              type="datetime-local"
              id="datetime"
              name="datetime"
              value={modalData.datetime}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  datetime: e.target.value,
                })
              }
            />
            <label htmlFor="table">Обрати столик:</label>
            <InputField
              type="number"
              id="table"
              name="table"
              value={modalData.table}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  table: e.target.value,
                })
              }
            />
            <label htmlFor="numberOfVisitors">Кількість відвідувачів:</label>
            <InputField
              type="number"
              id="numberOfVisitors"
              name="numberOfVisitors"
              value={modalData.numberOfVisitors}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  numberOfVisitors: e.target.value,
                })
              }
            />
            <Button type="submit">Додати Резервацію</Button>
            <Button onClick={() => setAddModal(false)}>Скасувати</Button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default Reservations;
