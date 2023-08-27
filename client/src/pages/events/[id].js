import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EventDetail = () => {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (router.query.id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/events/${router.query.id}`
          );
          setEvent(response.data);
          setError(null);
        } catch (error) {
          setError(error.message);
          setEvent(null);
        }
      };
      fetchEvent();
    }
  }, [router.query.id]);

  return (
    <main>
      {error ? (
        <p className="text-center text-lg py-8">
          No such event was found. Details for developers can be found below.
          <br />
          <br />
          An error occurred: {error}
        </p>
      ) : event ? (
        <div>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          {/* Diğer event bilgilerini burada göster */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default EventDetail;
