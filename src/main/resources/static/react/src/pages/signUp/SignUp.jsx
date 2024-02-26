import classes from "./SignUp.module.css"
import SignUpForm from "../../components/SignUpForm.jsx";

export default function SignUp() {

    return (
        <>
            <div className={classes.regFormWrapper}>
                <div className={classes.regFormContainer}>
                    <SignUpForm/>
                </div>
            </div>
        </>
    )
}