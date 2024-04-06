import classes from "../pages/signIn/SignIn.module.css";
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAuthData} from "../reducers/authSlice.js";

export default function SignInForm() {
    const dispatch = useDispatch();
    let navigate = useNavigate();


    const onFinish = async (values) => {
        try {
            const response = await fetch("/api/authentication", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Something went wrong. Status : " + response.statusText + ". Body : " + response.body);
            }

            const responseData = await response.json();
            dispatch(setAuthData(responseData));
            navigate("/account");
        } catch (error) {
            console.error('Authorisation failed:', error);
        }
    };

    return (
        <Form
            name="authentication"
            className={classes.loginForm}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className={classes.checkbox}>Remember me</Checkbox>
                </Form.Item>

                <a className={classes.loginFormForgot} href="">
                    Forgot password
                </a>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className={classes.loginFormButton}>
                    Log in
                </Button>
                Don't have an account? <Link to={"/registration"}>Register!</Link>
            </Form.Item>
        </Form>
    )
}