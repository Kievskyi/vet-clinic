import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import img1 from "../resources/images/infoMainPage_slider/slider_img1.png";
import img2 from "../resources/images/infoMainPage_slider/slider_img2.jpg";
import img3 from "../resources/images/infoMainPage_slider/slider_img3.jpg";

export default function PhotoSlider() {

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            speed={1500}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide><img className="swiper-image" src={img1} alt="Oops"/></SwiperSlide>
            <SwiperSlide><img className="swiper-image" src={img2} alt="Oops"/></SwiperSlide>
            <SwiperSlide><img className="swiper-image" src={img3} alt="Oops"/></SwiperSlide>
        </Swiper>
    )
}