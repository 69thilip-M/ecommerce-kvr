// src/components/Testimonials.jsx
import Slider from "react-slick";
import testimonialsData from "../pages/testimonialsData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-green-100 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-green-800 mb-8">
        🌟 What Our Customers Say 🌟
      </h2>

      <Slider {...settings}>
        {testimonialsData.map((t, index) => (
          <div key={index} className="px-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 h-40 flex flex-col justify-center">
              <p className="text-gray-700 italic">“{t.text}”</p>
              <h4 className="mt-4 font-semibold text-green-700">– {t.name}</h4>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
