import SliderForDetail from '@/components/SliderForDetail';
import { useEvent } from '@/context';
import { KeyboardArrowRight } from '@mui/icons-material';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EventDetail = () => {
  const router = useRouter();
  const { getEventById } = useEvent();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  function isValidUrl(url) {
    try {
      new URL(url);
      if (url.includes('https://www.google.com/maps/embed')) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    if (router.query.id) {
      getEventById(router.query.id).then((res) => {
        if (!res.message) {
          setEvent(res);
        } else {
          setError(res.message);
        }
      });
    }
  }, [router.query.id, getEventById]);

  return (
    <>
      <Head>
        <title>{event?.name ? `${event.name} |` : ''} EventPassify</title>
      </Head>
      <main>
        {error ? (
          <p className="text-center text-lg py-8">
            No such event was found. Details for developers can be found below.
            <br />
            <br />
            An error occurred: {error}
          </p>
        ) : (
          event && (
            <>
              <SliderForDetail images={event.images} />
              <div className="flex flex-col py-8">
                <div className="page-header !items-start !py-0">
                  <Link
                    href={`/events?search=${event.name}`}
                    className="title"
                  >
                    {event.name}
                  </Link>
                  <h1 className="sub-title text-left mt-5">
                    {event.description}
                  </h1>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-8">
                <div className="py-4 px-2 bg-[#f4f4f4] dark:bg-[#222222] rounded-2xl grid grid-cols-1 xl:grid-cols-2 gap-2">
                  <div
                    className="flex flex-col justify-center gap-y-2 items-center text-center px-1.5 py-2 bg-white rounded-2xl dark:bg-black w-full h-[100px] hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors duration-300 ease-in-out cursor-pointer"
                    onClick={() => {
                      router.push(`/events?search=${event.location}`);
                    }}
                  >
                    <span className="text-xl font-medium px-2">
                      {event.city}
                    </span>
                    <span className="text-base px-2 font-medium">
                      {event.location}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center gap-y-2 items-center text-center px-1.5 py-2 bg-white rounded-2xl dark:bg-black w-full h-[100px] hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors duration-300 ease-in-out">
                    <div className="flex flex-row gap-x-5 justify-between items-center h-full w-full">
                      <div className="rounded-full px-3 py-0.5 text-base font-medium italic bg-[#f4f4f4] dark:bg-[#222222] flex items-center justify-center">
                        {dayjs(event.startDate).format('HH:mm')}
                      </div>
                      <span className="text-lg font-semibold">
                        {dayjs(event.startDate).format('DD/MM/YYYY')}
                      </span>
                      <div className="rounded-full px-3 py-0.5 text-base font-medium italic bg-[#f4f4f4] dark:bg-[#222222] flex items-center justify-center">
                        {dayjs(event.endDate).format('HH:mm')}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-y-2 items-center text-center px-1.5 py-2 bg-white rounded-2xl dark:bg-black w-full h-[100px] hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors duration-300 ease-in-out relative">
                    {event.free[0] === true ? (
                      <div className="cross-container">
                        <div className="cross-line bg-dark-bg dark:bg-light-bg bg-opacity-40 dark:bg-opacity-40"></div>
                        <div className="bg-green-500 absolute text-lg left-0 right-0 m-auto top-0 bottom-0 h-fit w-fit px-5 py-0.5 rounded-full font-medium italic z-20 text-dark-txt dark:text-light-txt">
                          FREE
                        </div>
                        <div className="cross-line bg-dark-bg dark:bg-light-bg bg-opacity-40 dark:bg-opacity-40"></div>
                      </div>
                    ) : (
                      ''
                    )}

                    <div className="flex justify-between items-center px-2 w-full gap-10">
                      <span>{event.ticketPrices[0].category}:</span>
                      <span>{event.ticketPrices[0].price}</span>
                    </div>
                    <div className="flex justify-between items-center px-2 w-full gap-10">
                      <span>{event.ticketPrices[1].category}:</span>
                      <span>{event.ticketPrices[1].price}</span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-end items-center text-center px-1.5 py-2 bg-white rounded-2xl dark:bg-black w-full h-[100px] hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors duration-300 ease-in-out cursor-pointer">
                    <span>
                      {event.free[0] === true
                        ? 'Go to the registration form'
                        : 'Buy tickets'}
                    </span>
                    <KeyboardArrowRight className="h-full w-auto" />
                  </div>
                </div>
                <div>
                  {isValidUrl(event.maps) ? (
                    <iframe
                      title="Google Harita"
                      src={event.maps}
                      className="h-full w-full filter grayscale dark:invert rounded-2xl transition-all duration-300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  ) : (
                    <div className="flex flex-col justify-center gap-y-2 items-center text-center px-1.5 py-2 bg-[#f4f4f4] rounded-2xl dark:bg-[#222222] w-full h-full hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors duration-300 ease-in-out cursor-pointer">
                      No valid URL available
                    </div>
                  )}
                </div>
                <span className="col-span-1 md:col-span-2 flex w-full justify-center">
                  ({event.address})
                </span>
              </div>

              <div className="page-content">
                <div className="title text-center">
                  Event General Rules and Guidelines
                </div>
                <ul className="list-disc flex flex-col gap-y-2 text-light-txt dark:text-dark-txt text-opacity-60 dark:text-opacity-60 list-inside">
                  <li>
                    After the event begins, EventPassify and the Organizer are
                    not responsible for attendees being unable to sit in their
                    purchased seats. The Organizer company and EventPassify do
                    not guarantee seating for latecomers. Therefore, we kindly
                    request that you arrive well before the concert time.
                  </li>
                  <li>
                    Children under 6 years old are not allowed in the event
                    area. Attendees aged 6 and above must have a valid ticket.
                  </li>
                  <li>
                    The organizing company reserves the right to make changes to
                    the program and ticket prices.
                  </li>
                  <li>
                    Purchased tickets are non-refundable, non-exchangeable, and
                    non-transferable. Additionally, guests who enter the event
                    area by scanning their ticket and later leave the event area
                    will not be allowed to re-enter using the same ticket.
                    Guests wishing to re-enter must purchase a new ticket.
                  </li>
                  <li>
                    Throughout the event, all attendees must carry their tickets
                    with them.
                  </li>
                  <li>
                    Event tickets must be obtained only from officially
                    designated sales points determined by the event organizer.
                    The event organizer has the right to deny entry to the event
                    area for tickets not purchased from official sales points.
                  </li>
                  <li>
                    Purchased tickets cannot be used for commercial or
                    non-commercial purposes such as advertising, contests,
                    raffles, promotions, etc., without written permission from
                    the Organizer. Tickets used for such purposes will be
                    voided.
                  </li>
                  <li>
                    Security personnel will subject all individuals entering the
                    event area to security checks.
                  </li>
                  <li>
                    The organizing company reserves the right to refuse entry to
                    individuals deemed disruptive or disturbing to other guests,
                    under the condition of refunding the ticket price.
                  </li>
                  <li>
                    Cameras, cameras, audio devices, and other visual-audio
                    recording devices are not allowed into the event venue.
                  </li>
                  <li>
                    Selfie sticks and GoPro poles are not allowed in the event
                    area.
                  </li>
                  <li>
                    Recording is not permitted during the event. Audience
                    members accept that visual-audio recording devices may be
                    confiscated if deemed appropriate by the artist management.
                  </li>
                  <li>
                    Flammable, explosive (deodorant, spray, perfume, cologne,
                    etc.), incendiary, cutting, piercing tools, any type of
                    firearms, thermoses, motorcycle helmets, and laser pointers
                    are not allowed into the event area.
                  </li>
                  <li>Pets are not allowed into the event area.</li>
                  <li>
                    External food and drinks are not allowed in the concert
                    area.
                  </li>
                  <li>
                    By participating in the event, attendees agree to grant the
                    Organizer the right to use photographs and videos taken
                    during the event for promotional materials.
                  </li>
                  <li>
                    Please keep your personal belongings with you at all times
                    within the event area. The responsibility for all personal
                    belongings rests with the participant.
                  </li>
                  <li>
                    Please adhere to these rules and guidelines. We wish you a
                    delightful experience during the event.
                  </li>
                </ul>
              </div>
            </>
          )
        )}
      </main>
    </>
  );
};

export default EventDetail;
