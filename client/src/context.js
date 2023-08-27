import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = 'http://localhost:4000';

  const addEvent = async (event) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/events', event);
      setEvents((prevEvents) => [...prevEvents, response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/events/${id}`, updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event._id === id ? response.data : event))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (eventId, images) => {
    setLoading(true);
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });
      const response = await axios.post(
        `/api/upload-images/${eventId}`,
        formData
      );

      setLoading(false);
      return response.data.images;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (eventId, img) => {
    setLoading(true);
    try {
      await axios.delete(`/api/delete-image/${eventId}`, {
        data: { imageName: img },
      });
      fetchAllEvents();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/events/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        addEvent,
        fetchAllEvents,
        updateEvent,
        uploadImages,
        deleteImage,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  return useContext(EventContext);
}
