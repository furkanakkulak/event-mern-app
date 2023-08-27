import AddEvent from '@/components/dashboard/AddEvent';
import { useEvent } from '@/context';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import EditEvent from '@/components/dashboard/EditEvent';
import EventImage from '@/components/dashboard/EventImage';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

const Dashboard = () => {
  const { events, fetchAllEvents, deleteEvent } = useEvent();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this event?'
    );
    if (confirmDelete) {
      deleteEvent(id);
    }
  };

  return (
    <main className="py-10">
      <AddEvent />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {events?.map((event, index) => (
          <div
            key={index}
            className="rounded overflow-hidden border px-2.5 py-2.5 mt-5 relative text-sm flex flex-col gap-5 border-[#f4f4f4] dark:border-[#222222] bg-[#f4f4f4] dark:bg-[#222222]"
          >
            <div className="items-center justify-between flex text-light-txt dark:text-dark-txt">
              <Button
                variant="contained"
                color="success"
                className="bg-green-500 bg-opacity-80 px-1 py-0.5 text-xs rounded text-light-txt"
              >
                {dayjs(event.startDate).format('DD/MM/YYYY HH:mm')}
              </Button>
              <Button
                className="bg-blue-500 bg-opacity-80 px-1 py-0.5 text-xs rounded text-light-txt"
                variant="contained"
              >
                {event.type}
              </Button>
              <Button
                variant="contained"
                color="error"
                className="bg-red-500 bg-opacity-80 px-1 py-0.5 text-xs rounded text-light-txt"
              >
                {dayjs(event.endDate).format('DD/MM/YYYY HH:mm')}
              </Button>
            </div>
            <div className="flex flex-col items-center text-center w-full">
              <p className="text-lg">{event.name}</p>
              <p>
                {event.city} - {event.location}
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(event._id)}
              >
                <Delete />
              </Button>
              <EventImage
                data={event.images}
                id={event._id}
              />
              <EditEvent data={event} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
