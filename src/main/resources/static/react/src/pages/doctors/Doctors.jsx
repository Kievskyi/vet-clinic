import classes from "./Doctors.module.css"
import {employee} from "../../resources/employee/employee.js"
import {Card} from 'antd';
import {useState} from "react";

const {Meta} = Card;

export default function Doctors() {
    const [speciality, setSpeciality] = useState("Cardiology")

    const gridStyle = {
        width: '100%',
        textAlign: 'center',
    };


    function handleSpeciality(speciality) {
        setSpeciality(speciality)
    }

    return (
        <div>
            <p className={classes.pageNameText}>Our team</p>
            <div className={classes.doctorsPageWrapper}>
                <div className={classes.doctorsPageContainer}>
                    <div className={classes.sideMenuContainer}>
                        <Card title="Categories of specialists:" style={{textAlign: "center"}}>
                            {Object.keys(employee[0]).map((speciality, index) => (
                                <Card.Grid onClick={() => handleSpeciality(speciality)}
                                           className={classes.sideMenuContainerGrid}
                                           key={index}>{speciality}</Card.Grid>
                            ))}
                        </Card>

                    </div>
                    <div className={classes.doctorsContainer}>
                        {employee.flatMap((department) => (
                            Object.keys(department).flatMap((specialist) => (
                                specialist === speciality ? (
                                    Object.values(department[specialist]).map((doctor, index) => (
                                        <Card
                                            key={index}
                                            hoverable
                                            className={classes.doctorsCard}
                                            cover={<img alt="example"
                                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                                        >
                                            <Meta title={doctor.name + " " + doctor.surname}
                                                  description={doctor.about}/>
                                        </Card>
                                    ))
                                ) : []
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}