import img1 from "../../resources/images/infoMainPage_slider/slider_img1.png";
import img2 from "../../resources/images/infoMainPage_slider/slider_img2.png";
import classes from "./PhotoSlider.module.css"
import {Carousel} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

export default function PhotoSlider() {

    return (
        <div className={classes.carouselContainer}>
            <Carousel effect="fade"
                      autoplay={true}
                      autoplaySpeed={8000}
                      infinite={true}
                      speed={1500}
                      arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined/>}>
                <div>
                    <h3 className={classes.content}><img className={classes.swiperImage} src={img1} alt="Oops"/></h3>
                </div>
                <div>
                    <h3 className={classes.content}><img className={classes.swiperImage} src={img2} alt="Oops"/></h3>
                </div>
            </Carousel>
        </div>
    )
}