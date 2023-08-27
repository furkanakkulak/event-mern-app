import ImageSlider from '@/components/Slider';
import { useEvent } from '@/context';
import { useEffect } from 'react';

const Concerts = () => {
  const { fetchAllEvents, events } = useEvent();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const [futureEvents, pastEvents] = events.reduce(
    (acc, event) => {
      if (event.type === 'future' && event.category === 'concerts') {
        acc[0].push(event);
      } else if (event.type === 'past' && event.category === 'concerts') {
        acc[1].push(event);
      }
      return acc;
    },
    [[], []]
  );

  return (
    <main>
      <div className="page-header">
        <h1 className="title">Concerts</h1>
        <p className="sub-title">
          Get Ready for Unforgettable Concert Experiences
        </p>
      </div>
      <div className="page-content flex flex-col gap-y-10">
        <div>
          {futureEvents.length > 0 ? (
            <ImageSlider
              data={futureEvents}
              title="Future Concerts"
            />
          ) : (
            <p className="text-center text-2xl">No upcoming concerts</p>
          )}
        </div>
        <div>
          {pastEvents.length > 0 ? (
            <ImageSlider
              data={pastEvents}
              title="Past Concerts"
            />
          ) : (
            <p className="text-center text-2xl">No past concerts</p>
          )}
        </div>
      </div>
    </main>
  );
};
export default Concerts;
