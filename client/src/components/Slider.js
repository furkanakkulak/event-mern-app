import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';
import Image from 'next/image';
import {
  EventAvailable,
  EventBusy,
  LocationOn,
  MoneyOff,
} from '@mui/icons-material';
import noImage from '../assets/no-image.svg';
import { Autoplay } from 'swiper/modules';

const ImageSlider = ({ title, data, category }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="title">{title}</div>
        <Link
          className="italic text-sm text-primary hover:text-secondary"
          href={`/events?category=${category}&type=${
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
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
      >
        {data.map((event, index) => (
          <SwiperSlide key={index}>
            <Link
              href={`/events/${event._id}`}
              className="relative"
            >
              <Image
                className="slider-img scale-[99%] transform hover:-translate-1 hover:scale-100 h-[200px] object-cover"
                src={event.images[0] ? `${event.images[0].imageUrl}` : noImage}
                width={600}
                height={400}
                alt={event.description}
              />
              <h1 className="slider-title">{event.name}</h1>
              <p className="slider-date !right-auto !left-2 ">
                <LocationOn className="h-[20px]" />
                {event.city}
              </p>
              <p
                className={`slider-date text-dark-txt dark:text-light-txt  ${
                  event.type === 'future' ? '!bg-secondary' : '!bg-primary'
                }`}
              >
                {event.type === 'future' ? (
                  <EventAvailable className="h-[15px]" />
                ) : (
                  <EventBusy className="h-[15px]" />
                )}
                {dayjs(
                  event.type == 'future' ? event.startDate : event.endDate
                ).format('DD/MM/YYYY HH:mm')}
              </p>
              {event.free[0] == true && (
                <span className="absolute bg-emerald-600 text-dark-txt dark:text-light-txt px-4 py-1 text-xs bottom-11 left-2 rounded-full">
                  <MoneyOff className="w-4" />
                </span>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
