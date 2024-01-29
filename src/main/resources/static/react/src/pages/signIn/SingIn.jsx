import {Layout} from 'antd';
import classes from "./SignIn.module.css"
import SignInForm from "../../components/SignInForm.jsx";

const Content = Layout;

export default function SignIn() {

    return (

        <Layout className={classes.layoutStyle}>
            <Content>
                <SignInForm/>
            </Content>
        </Layout>
    )
}