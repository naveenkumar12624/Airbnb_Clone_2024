import React from "react";
import "./Card_styles.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

function Card({ card }) {
  return (
    <div className="card-box">
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        loop={true}
        mousewheel={true}
        cssMode={true}
        pagination={{ clickable: true }}
        navigation={true}
        lazy={true} // Enable lazy loading
        preloadImages={false} // Do not preload images
        modules={[Pagination, Navigation]}
        className="swiper-container"
      >
        {card.imgSrc.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              className="card-img swiper-lazy"
              alt={`Slide ${i + 1}`}
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="card-info-flex">
        <h3 className="card-title">{card.title}</h3>
        <div className="card-rating">
          <StarRateRoundedIcon />
          <p>{card.rating}</p>
        </div>
      </div>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.desc}</p>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>Region: {card.region}</p>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>Available from: {card.date}</p>
      <p
        style={{
          margin: "0.2rem",
          fontSize: "1rem",
          color: "var(--black)",
        }}
      >
        <span style={{ fontWeight: "600" }}>₹{card.price}</span> per night
      </p>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>Max Guests: {card.guests}</p>
    </div>
  );
}

export default Card;

