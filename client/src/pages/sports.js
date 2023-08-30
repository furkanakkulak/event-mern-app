import ImageSlider from '@/components/Slider';
import { useEvent } from '@/context';
import Head from 'next/head';
import { useEffect } from 'react';

const Sports = () => {
  const { fetchAllEvents, events } = useEvent();

  useEffect(() => {
    if (events.length < 1) {
      fetchAllEvents();
    }
  }, [fetchAllEvents, events.length]);
  const [futureEvents, pastEvents] = events.reduce(
    (acc, event) => {
      if (event.type === 'future' && event.category === 'sports') {
        acc[0].push(event);
      } else if (event.type === 'past' && event.category === 'sports') {
        acc[1].push(event);
      }
      return acc;
    },
    [[], []]
  );

  return (
    <>
      <Head>
        <title>Sports | EventPassify</title>
      </Head>
      <main>
        <div className="page-header">
          <h1 className="title">Sports</h1>
          <p className="sub-title">
            Get Ready for Thrilling Sports Experiences
          </p>
        </div>
        <div className="page-content flex flex-col gap-y-10">
          <div>
            {futureEvents.length > 0 ? (
              <ImageSlider
                data={futureEvents}
                title="Future Sports"
                category="sports"
              />
            ) : (
              <p className="text-center text-2xl">No upcoming sports</p>
            )}
          </div>
          <div>
            {pastEvents.length > 0 ? (
              <ImageSlider
                data={pastEvents}
                title="Past Sports"
                category="sports"
              />
            ) : (
              <p className="text-center text-2xl">No past sports</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default Sports;
