import image1 from "../../resources/images/about/about_img1.jpg"
import image2 from "../../resources/images/about/about_img2.jpg"
import classes from "./About.module.css"

export default function About() {

    return (
        <div className={classes.infoContainerWrapper}>
            <div className={classes.infoContainer1}>
                <div className={classes.infoContainerSection}>
                    <img src={image1} className={classes.infoImage1} alt="Oops"/>
                    <span className={classes.intoText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab, animi assumenda atque blanditiis cupiditate debitis incidunt ipsam laborum minima modi natus nemo praesentium repellat repellendus vel vero, vitae voluptatibus.</span>
                </div>
                <div className={classes.hello}>
                    <span className={classes.intoText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci fugiat in nulla perferendis repellat. Ad animi aspernatur cum, dolorum eligendi esse fugiat ipsam ipsum laboriosam minima placeat quos similique, vero.</span>
                    <img src={image2} className={classes.infoImage2} alt="Oops"/>
                </div>
            </div>
            <div className="info-container2">
                <div>
                    <img src="" alt=""/>
                    <span></span>
                </div>
                <div>
                    <img src="" alt=""/>
                    <span></span>
                </div>
            </div>
        </div>
    )
}