import classes from "./Services.module.css"
import {services} from "../../resources/text/services/services.js"
import {RightOutlined} from "@ant-design/icons";

export default function Services() {

    return (
        <>
            <p className={classes.pageNameText}>Our services</p>
            <div className="services-wrapper">
                <div className={classes.servicesContainer}>
                    {services.map((service, index) =>
                        <div key={index} className={classes.service}>
                            <div className={classes.serviceImageContainer}>
                                <div className={classes.serviceImage}
                                     style={{backgroundImage: `url(${service.photo})`}}></div>
                            </div>
                            <p className={classes.serviceName}>{service.title}</p>
                            <p className={classes.information}>More details <RightOutlined/></p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}