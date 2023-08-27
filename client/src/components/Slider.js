import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';
import Image from 'next/image';

const ImageSlider = ({ title, data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="title">{title}</div>
        <Link
          className="italic text-sm text-primary hover:text-secondary"
          href={`/events?category=concerts&type=${
            data[0].type === 'future' ? 'future' : 'past'
          }`}
        >
          See More
        </Link>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.5}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 3.5,
          },
          1024: {
            slidesPerView: 4.5,
          },
        }}
        loop={true}
        pagination={{ clickable: true }}
        className="slider"
      >
        {data.map((event) => (
          <SwiperSlide>
            <Link
              href={`/event/${event._id}`}
              className="relative"
            >
              <Image
                className="slider-img scale-[99%] transform hover:-translate-1 hover:scale-100"
                src={`http://localhost:4000/images/${event.images[0]}`}
                width={600}
                height={400}
                alt={event.description}
              />
              <h1 className="slider-title">{event.name}</h1>
              <p className="slider-date !right-auto !left-2">{event.city}</p>
              <p
                className={`slider-date text-dark-txt dark:text-light-txt ${
                  event.type == 'future' ? '!bg-secondary' : '!bg-primary'
                }`}
              >
                {dayjs(
                  event.type == 'future' ? event.startDate : event.endDate
                ).format('DD/MM/YYYY HH:mm')}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;