import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";
import defaultImage from "./assets/default-img.jpg";
import SuccessAlert from "./SuccessAlert";

function Events() {
  const { userId } = useGlobalContext();

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });

  // Pobieranie wydarzeń
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/events`);
        const eventsWithFullImageUrl = response.data.map((event) => ({
          ...event,
          imageUrl: event.imageUrl
            ? `http://localhost:8001/eventImage/${event.imageUrl}`
            : null,
        }));
        setEvents(eventsWithFullImageUrl);
      } catch (error) {
        console.error("Błąd podczas pobierania wydarzeń", error);
      }
    };

    fetchEvents();
  }, []);

  // Dodawanie nowego wydarzenia
  const handleAddEvent = async () => {
    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("shortDescription", newEvent.shortDescription);
    formData.append("longDescription", newEvent.longDescription);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/events/newevent",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Odpowiedź serwera:", response);
      setEvents((prevEvents) => [...prevEvents, response.data]);
    } catch (error) {
      console.error("Błąd podczas dodawania wydarzenia:", error);
    }
  };

  // Usuwanie wydarzenia
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8001/events/removeevent/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.eventId !== eventId)
      );
      setSelectedEvent(null);
      setAlert({
        show: true,
        message: "Pomyślnie usunięto wydarzenie",
      });
    } catch (error) {
      console.error("Błąd podczas usuwania wydarzenia:", error);
    }
  };

  return (
    <div>
      {/* alert */}
      {alert.show && (
        <SuccessAlert
          message={alert.message}
          onClose={() => setAlert({ show: false, message: "" })}
        />
      )}
      <div className="container-events">
        <div>
          {userId && (
            <button
              className="submit-btn event-btn"
              onClick={() => setShowPopup(true)}
            >
              Dodaj wydarzenie
            </button>
          )}

          {showPopup && (
            <div className="popup">
              <div className="popup-inner">
                <h2>Nowe wydarzenie</h2>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Tytuł</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Krótki opis</label>
                    <textarea
                      className="form-control"
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          shortDescription: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Długi opis</label>
                    <textarea
                      className="form-control"
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          longDescription: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Zdjęcie</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn add-btn"
                    onClick={(
                      () => {handleAddEvent();
                      setShowPopup(false);
                      setNewEvent({
                        title: "",
                        shortDescription: "",
                        longDescription: "",
                      });
                      setAlert({
                        show: true,
                        message: "Pomyślnie dodano wydarzenie",
                      });})}
                  >
                    Dodaj
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setShowPopup(false);
                      setNewEvent({
                        title: "",
                        shortDescription: "",
                        longDescription: "",
                      });
                      setImageFile(null);
                    }}
                  >
                    Anuluj
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {events.length > 0 && (
          <div className="events">
            {events.map((event) => (
              <div key={event.eventId} className="event">
                {event.imageUrl ? (
                  <img src={event.imageUrl} alt={event.title} />
                ) : (
                  <img src={defaultImage} alt={event.title}/>
                )}
                <div className="event-right">
                  <h2>{event.title}</h2>
                  <p>{event.shortDescription}</p>
                  <p
                    className="more-info"
                    onClick={() => setSelectedEvent(event)}
                  >
                    Dowiedz się więcej
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {events.length === 0 && (
          <div className="events">
            <h2>Brak wydarzeń</h2>
          </div>
        )}

        {selectedEvent && (
          <div className="popup">
            <div className="event-popup-inner">
              <h2>{selectedEvent.title}</h2>
              {selectedEvent.imageUrl ? (
                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
              ) : (
                <img src={defaultImage} alt={selectedEvent.title}/>
              )}
              <span>OPIS WYDARZENIA</span>
              <div className="description-container">
                <p>{selectedEvent.longDescription}</p>
              </div>
              {userId && (
                <button
                  onClick={() => handleDeleteEvent(selectedEvent.eventId)}
                  className="btn add-btn"
                >
                  Usuń wydarzenie
                </button>
              )}
              <button
                onClick={() => setSelectedEvent(null)}
                className="btn btn-secondary ms-2"
              >
                Zamknij
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
