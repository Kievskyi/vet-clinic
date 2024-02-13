import classes from "./SignIn.module.css"
import SignInForm from "../../components/SignInForm.jsx";

export default function SignIn() {

    return (
        <>
            <div className={classes.signInFormWrapper}>
                <div className={classes.signInFormContainer}>
                    <SignInForm/>
                </div>
            </div>
        </>
    )
}