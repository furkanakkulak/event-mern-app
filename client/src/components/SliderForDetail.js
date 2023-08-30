import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import noImage from '../assets/no-image.svg';
import { Autoplay } from 'swiper/modules';

const SliderForDetail = ({ images }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={images.length < 1 ? 1 : 1.5}
      breakpoints={{
        640: {
          slidesPerView: images.length < 1 ? 1 : 1.5,
        },
        1024: {
          slidesPerView: images.length < 1 ? 1 : 2.5,
        },
      }}
      loop={true}
      pagination={{ clickable: true }}
      className="slider"
      modules={[Autoplay]}
      autoplay={{ delay: 4500 }}
    >
      {images &&
        images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              className="slider-img scale-[99%] transform hover:-translate-1 hover:scale-100 !h-[150px] md:!h-[350px] object-cover !w-full rounded-2xl"
              src={image.imageUrl}
              width={1000}
              height={400}
              alt={image}
            />
          </SwiperSlide>
        ))}
      {images.length < 1 && (
        <SwiperSlide>
          <Image
            className="slider-img scale-[99%] transform hover:-translate-1 hover:scale-100 !h-[150px] md:!h-[350px] w-full object-cover"
            src={noImage}
            width={600}
            height={400}
            alt={images}
          />
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default SliderForDetail;
