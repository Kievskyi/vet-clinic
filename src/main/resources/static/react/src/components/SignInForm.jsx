import classes from "../pages/signIn/SignIn.module.css";
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export default function SignInForm() {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className={classes.loginForm}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
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
                <Button type="primary" htmlType="submit" className={classes.loginFormButton} >
                    Log in
                </Button>
                Don't have an account? <Link to={"/registration"}>Register!</Link>
            </Form.Item>
        </Form>
    )
}