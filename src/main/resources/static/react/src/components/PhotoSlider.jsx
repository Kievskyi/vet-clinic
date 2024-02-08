import img1 from "../resources/images/infoMainPage_slider/slider_img1.png";
import img2 from "../resources/images/infoMainPage_slider/slider_img2.png";
import {Carousel} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

export default function PhotoSlider() {

    const contentStyle = {
        height: '500px',
        width: '100%',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <div className={"carousel-container"}>
            <Carousel effect="fade"
                      autoplay={true}
                      autoplaySpeed={8000}
                      infinite={true}
                      speed={1500}
                      arrows prevArrow={<LeftOutlined/>} nextArrow={<RightOutlined/>}>
                <div>
                    <h3 style={contentStyle}><img className="swiper-image" src={img1} alt="Oops"/></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img className="swiper-image" src={img2} alt="Oops"/></h3>
                </div>
            </Carousel>
        </div>
    )
}