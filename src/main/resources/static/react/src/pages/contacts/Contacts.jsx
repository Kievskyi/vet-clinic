import classes from "./Contacts.module.css"
import Map from "../../components/Map.jsx";

export default function Contacts() {

    return (
        <div>
            <p className={classes.text}>Our contacts</p>
            <div className={classes.contactsWrapper}>
                <div className={classes.contactsContainer}>
                    <span style={{fontSize: 20, display: "block", marginBottom: 15}}>Telephone:</span>
                    <div className={classes.contacts}>
                        <a href="tel:+38(096)5555555" className={classes.phoneNumber}>+38 (096) 555 55 55</a>
                        <a href="tel:+(044)5555555" className={classes.phoneNumber}>044 555 55 55</a>
                    </div>
                    <span style={{fontSize: 20, display: "block", marginBottom: 15}}>Email:</span>
                    <div className={classes.contacts}>
                        <a href="mailto:aaaaa@vetclinic.com" className={classes.mail}>aaaaa@vetclinic.com</a>
                    </div>
                </div>
                <Map/>
            </div>
        </div>


    )
}