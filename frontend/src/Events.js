import React, { useEffect, useState } from "react";
import axios from "axios";

function Events() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: "",
        shortDescription: "",
        longDescription: "",
    });
    const [imageFile, setImageFile] = useState(null);

    // Pobieranie wydarzeń
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/events`);
                const eventsWithFullImageUrl = response.data.map(event => ({
                    ...event,
                    imageUrl: `http://localhost:8001/eventImage/${event.imageUrl}`,
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
            const response = await axios.post("http://localhost:8001/events/newevent", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setEvents((prevEvents) => [...prevEvents, response.data]);
        } catch (error) {
            console.error("Błąd podczas dodawania wydarzenia:", error);
        }
    };

    // Usuwanie wydarzenia
    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:8001/events/removeevent/${eventId}`);
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        } catch (error) {
            console.error("Błąd podczas usuwania wydarzenia:", error);
        }
    };

    return null; 
}

export default Events;
