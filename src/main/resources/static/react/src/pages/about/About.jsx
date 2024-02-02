import image1 from "../../resources/images/about/about_img1.jpg"
import image2 from "../../resources/images/about/about_img2.jpg"
import classes from "./About.module.css"
import {useState} from "react";
import ScrollTrigger from "react-scroll-trigger";

export default function About() {
    const [isVisible, setIsVisible] = useState(false)

    const handleEnterViewport = () => {
        setIsVisible(true);
        console.log("Хендлит")
    };

    return (
        <div className={classes.infoContainerWrapper}>
            <div className={classes.infoContainer1}>
                <div className={classes.infoContainerSection1}>
                    <img src={image1} className={classes.infoImage1} alt="Oops"/>
                    <span className={classes.intoText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab, animi assumenda atque blanditiis cupiditate debitis incidunt ipsam laborum minima modi natus nemo praesentium repellat repellendus vel vero, vitae voluptatibus.</span>
                </div>
                <div className={classes.infoContainerSection2}>
                    <span className={classes.intoText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci fugiat in nulla perferendis repellat. Ad animi aspernatur cum, dolorum eligendi esse fugiat ipsam ipsum laboriosam minima placeat quos similique, vero.</span>
                    <img src={image2} className={classes.infoImage2} alt="Oops"/>
                </div>
            </div>
            <ScrollTrigger onEnter={handleEnterViewport}>
                <div className={classes.infoContainer2}>
                    <div className={`${classes.infoContainerSection3} ${isVisible ? classes.active : ""}`}>
                        <img src={image2} alt=""/>
                        <span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto aut consequuntur cupiditate dolore earum, eligendi error illum maiores obcaecati repellendus, repudiandae sunt, voluptate voluptatibus. Consequatur earum laboriosam magnam?</span><span>Aliquid animi asperiores, corporis cupiditate delectus enim esse, et, facere itaque iusto maiores natus nemo nobis officiis omnis possimus praesentium reprehenderit sint suscipit vero? Consequatur numquam pariatur quae quibusdam quisquam!</span></span>
                    </div>
                    <div className={`${classes.infoContainerSection4} ${isVisible ? classes.active : ""}`}>
                        <img src={image2} alt=""/>
                        <span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto aut consequuntur cupiditate dolore earum, eligendi error illum maiores obcaecati repellendus, repudiandae sunt, voluptate voluptatibus. Consequatur earum laboriosam magnam?</span><span>Aliquid animi asperiores, corporis cupiditate delectus enim esse, et, facere itaque iusto maiores natus nemo nobis officiis omnis possimus praesentium reprehenderit sint suscipit vero? Consequatur numquam pariatur quae quibusdam quisquam!</span></span>
                    </div>
                    <div className={`${classes.infoContainerSection5} ${isVisible ? classes.active : ""}`}>
                        <img src={image2} alt=""/>
                        <span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto aut consequuntur cupiditate dolore earum, eligendi error illum maiores obcaecati repellendus, repudiandae sunt, voluptate voluptatibus. Consequatur earum laboriosam magnam?</span><span>Aliquid animi asperiores, corporis cupiditate delectus enim esse, et, facere itaque iusto maiores natus nemo nobis officiis omnis possimus praesentium reprehenderit sint suscipit vero? Consequatur numquam pariatur quae quibusdam quisquam!</span></span>
                    </div>
                </div>
            </ScrollTrigger>
        </div>
    )
}