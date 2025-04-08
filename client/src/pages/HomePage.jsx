import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import layer1 from '../assets/backgroundImgs/layer1.jpg';
import layer2 from '../assets/backgroundImgs/layer2.png';
import { Footer } from '../components/Footer/Footer';
import ContainerElement from '../components/ContainerElement/ContainerElement';
import axios from 'axios';
import Modal from '../components/UI/Modal/Modal';

export function HomePage() {
  const [reservations, setReservations] = useState([]);
  const [editModel, setEditModel] = useState(false);
  const [editModalData, setEditModalData] = useState({
    datetime: '',
    table: '',
    numberOfVisitors: '',
  });
  const [addModal, setAddModal] = useState(false);
  const [addModalData, setAddModalData] = useState({
    datetime: '',
    table: '',
    numberOfVisitors: '',
  });
  const [reservationToEdit, setReservationToEdit] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    fetchReservations();
  }, []);

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
      start_time: editModalData.datetime,
      table_id: editModalData.table,
      number_of_visitors: editModalData.numberOfVisitors,
    };

    try {
      const res = await axios.put(
        `http://localhost:8080/api/reservations/${reservationToEdit.reservation_id}`,
        dataToSend,
        { withCredentials: true }
      );
      setEditModel(false);
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.reservation_id === reservationToEdit.reservation_id
            ? res.data
            : reservation
        )
      );
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const addReservation = async (e) => {
    e.preventDefault();
    const dataToSend = {
      start_time: addModalData.datetime,
      table_id: addModalData.table,
      number_of_visitors: addModalData.numberOfVisitors,
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
    }
  };

  const formatDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (reservationToEdit) {
      setEditModalData({
        datetime: formatDateTimeLocal(reservationToEdit.start_time),
        table: reservationToEdit.table_id,
        numberOfVisitors: reservationToEdit.number_of_visitors,
      });
    }
  }, [reservationToEdit]);

  return (
    <>
      <Parallax pages={2.35} style={{ top: '0', left: '0' }}>
        <ParallaxLayer
          offset={0}
          speed={0.13}
          style={{
            backgroundImage: `url(${layer1})`,
            backgroundSize: 'cover',
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={0}
          style={{
            backgroundImage: `url(${layer2})`,
            backgroundSize: 'cover',
          }}
        ></ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.6}>
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

        <ParallaxLayer offset={1} speed={0}>
          <ContainerElement>
            <h1>Ваші заброньовані столики</h1>
            {isAuthenticated === null && <h2>Завантаження...</h2>}
            {isAuthenticated === true && (
              <>
                <ul>
                  {reservations.map((reservation) => (
                    <li key={reservation.reservation_id}>
                      <table>
                        <thead>
                          <tr>
                            <th>Номер столику</th>
                            <th>Кількість відвідувачів</th>
                            <th>Час</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{reservation.table_id}</td>
                            <td>{reservation.number_of_visitors}</td>
                            <td>{reservation.start_time}</td>
                            <td>
                              <button
                                onClick={() =>
                                  removeReservation(reservation.reservation_id)
                                }
                              >
                                Скасувати
                              </button>
                              <button
                                onClick={() => {
                                  setEditModel(true);
                                  setReservationToEdit(reservation);
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
                </ul>
                <button onClick={() => setAddModal(true)}>
                  Додати резервацію
                </button>
              </>
            )}
            {editModel && (
              <Modal>
                <form onSubmit={updateReservation}>
                  <label htmlFor="datetime">Обрати дату та час:</label>
                  <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    value={editModalData.datetime}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        datetime: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="table">Обрати столик:</label>
                  <input
                    type="number"
                    id="table"
                    name="table"
                    value={editModalData.table}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        table: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="numberOfVisitors">
                    Кількість відвідувачів:
                  </label>
                  <input
                    type="number"
                    id="numberOfVisitors"
                    name="numberOfVisitors"
                    value={editModalData.numberOfVisitors}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        numberOfVisitors: e.target.value,
                      })
                    }
                  />
                  <button type="submit">Підтвердити</button>
                </form>
              </Modal>
            )}
            {addModal && (
              <Modal>
                <form onSubmit={addReservation}>
                  <label htmlFor="datetime">Обрати дату та час:</label>
                  <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    value={addModalData.datetime}
                    onChange={(e) =>
                      setAddModalData({
                        ...addModalData,
                        datetime: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="table">Обрати столик:</label>
                  <input
                    type="number"
                    id="table"
                    name="table"
                    value={addModalData.table}
                    onChange={(e) =>
                      setAddModalData({
                        ...addModalData,
                        table: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="numberOfVisitors">
                    Кількість відвідувачів:
                  </label>
                  <input
                    type="number"
                    id="numberOfVisitors"
                    name="numberOfVisitors"
                    value={addModalData.numberOfVisitors}
                    onChange={(e) =>
                      setAddModalData({
                        ...addModalData,
                        numberOfVisitors: e.target.value,
                      })
                    }
                  />
                  <button type="submit">Додати Резервацію</button>
                </form>
              </Modal>
            )}
          </ContainerElement>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0}>
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </>
  );
}
