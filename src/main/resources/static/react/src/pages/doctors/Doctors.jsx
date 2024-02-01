import classes from "./Doctors.module.css"
import {employee} from "../../resources/employee/employee.js"
import {Card} from 'antd';

export default function Doctors() {
    const gridStyle = {
        width: '100%',
        textAlign: 'center',
    };

    return (
        <div className={classes.doctorsPageWrapper}>
            <div className={classes.doctorsPageContainer}>
                <div className={classes.sideMenuContainer}>
                    <Card title="Categories of specialists:">
                        {Object.keys(employee[0]).map((specialty, index) => (
                            <Card.Grid style={gridStyle} key={index}>{specialty}</Card.Grid>
                        ))}
                    </Card>

                </div>
                <div className={classes.doctorsContainer}>

                </div>
            </div>
        </div>
    )
}