import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import layer1 from '../assets/backgroundImgs/layer1.jpg';
import layer2 from '../assets/backgroundImgs/layer2.png';
import { Footer } from '../components/Footer/Footer';
import { NavBar } from '../components/NavBar/NavBar';
import ContainerElement from '../components/ContainerElement/ContainerElement';
import axios from 'axios';
import LoginButton from '../components/LoginButton/LoginButton';
import Modal from '../components/Modal/Modal';

export function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = not loaded yet
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

  function formatDateTimeLocal(isoString) {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  const checkAuthAndLoadReservations = async () => {
    try {
      const authRes = await axios.get(
        'http://localhost:8080/api/auth/check-auth',
        {
          withCredentials: true,
        }
      );
      if (authRes.status === 200) {
        setIsAuthenticated(true);
        const reservationRes = await axios.get(
          'http://localhost:8080/api/reservations',
          {
            withCredentials: true,
          }
        );
        setReservations(reservationRes.data);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const removeReservation = async (reservationId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/reservations/${reservationId}`,
        {
          withCredentials: true,
        }
      );
      checkAuthAndLoadReservations();
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
      await axios.put(
        `http://localhost:8080/api/reservations/${reservationToEdit.reservation_id}`,
        dataToSend,
        { withCredentials: true }
      );
      setEditModel(false);
      checkAuthAndLoadReservations();
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
      axios.post('http://localhost:8080/api/reservations', dataToSend, {
        withCredentials: true,
      });

      setAddModal(false);
      checkAuthAndLoadReservations();
    } catch {
      console.error('Error adding reservation:', error);
    }
  };

  useEffect(() => {
    checkAuthAndLoadReservations();
  }, []);

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
      <NavBar
        isAuthenticated={isAuthenticated}
        onLoginSuccess={checkAuthAndLoadReservations}
      />
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

        <ParallaxLayer offset={1} speed={0}>
          <ContainerElement>
            <h1>Ваші заброньовані столики</h1>
            {isAuthenticated === null && <h2>Завантаження...</h2>}
            {isAuthenticated === false && (
              <LoginButton
                onLoginSuccess={() => {
                  setIsAuthenticated(true);
                  axios
                    .get('http://localhost:8080/api/reservations', {
                      withCredentials: true,
                    })
                    .then((res) => setReservations(res.data));
                }}
              />
            )}
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
                  <label for="datetime">Обрати дату та час:</label>
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

                  <label for="table">Обрати столик:</label>
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
                  ></input>

                  <label for="numberOfVisitors">Кількість відвідувачів:</label>
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
                  ></input>

                  <button type="submit">Підтвердити</button>
                </form>
              </Modal>
            )}
            {addModal && (
              <Modal>
                <form onSubmit={addReservation}>
                  <label for="datetime">Обрати дату та час:</label>
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

                  <label for="table">Обрати столик:</label>
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
                  ></input>

                  <label for="numberOfVisitors">Кількість відвідувачів:</label>
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
                  ></input>

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
