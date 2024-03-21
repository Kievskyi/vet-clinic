import {Button, Checkbox, Form, Input, Select} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import classes from "../pages/signUp/SignUp.module.css";
import {useNavigate} from "react-router-dom";

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 25,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 0,
        },
    },
};

const tailFormButtonLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 9,
        },
    },
};

export default function SignUpForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await fetch("/api/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Something went wrong. Status : " + response.statusText);
            }

            navigate("/authentication");
        } catch (error) {
            console.error('Failed to register:', error);
        }


    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}
            >
                <Option value="38">+38</Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{prefix: '38'}}
                style={{maxWidth: 600}}
                scrollToFirstError
            >
                <Form.Item
                    name="firstName"
                    rules={[
                        {
                            type: 'string',
                            message: 'The input is not valid !',
                        },
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                    ]}
                >
                    <Input style={{width: "100%"}} prefix={<MailOutlined/>}
                           type="string"
                           placeholder="First name"/>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    rules={[
                        {
                            type: 'string',
                            message: 'The input is not valid !',
                        },
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input style={{width: "100%"}} prefix={<MailOutlined/>}
                           type="string"
                           placeholder="Last name"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input style={{width: "100%"}} prefix={<MailOutlined/>}
                           type="email"
                           placeholder="Email"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Confirm password"
                    />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Your phone number"
                        addonBefore={prefixSelector}
                        style={{width: '100%'}}
                    />
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormButtonLayout}>
                    <Button type="primary" htmlType="submit" className={classes.regFormButton}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}