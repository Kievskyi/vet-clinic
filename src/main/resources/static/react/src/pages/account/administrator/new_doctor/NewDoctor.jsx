import classes from "./NewDoctor.module.css"
import {Button, DatePicker, Form, Input, Select} from "antd";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useForm} from "antd/es/form/Form.js";

export default function NewDoctor() {
    const token = useSelector((state) => state.auth.token);
    const [prefix, setPrefix] = useState(null)
    const [clinics, setClinics] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [form] = useForm();

    const handleOnFinishForm = (values) => {
        const doctor = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phoneNumber: `+${values.prefix}${values.phoneNumber}`,
            address: values.address,
            birthDate: values.birthDate,
            clinic: values.clinic,
            specialty: values.specialty,
        };

        handleAddNewDoctor(doctor);
    }

    const handleAddNewDoctor = async (doctor) => {
        const url = `/api/admin/register-new-doctor`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(doctor),
            });

            if (!response.ok) {
                throw new Error("Something went wrong. Status : " + response.body);
            }

        } catch (error) {
            console.error('Failed to register:', error);
        }

        form.resetFields();
    }

    const fetchAllClinics = async () => {
        const url = `/api/clinic-info/all-clinics`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Could not fetch available clinics");
            }

            let clinics = await response.json();
            setClinics(clinics)

        } catch (error) {
            console.error("Failed to load available times:", error);
        }
    }

    const fetchAllSpecialties = async () => {
        const url = `/api/clinic-info/all-specialties`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Could not fetch specialties");
            }

            let specialties = await response.json();
            setSpecialties(specialties)

        } catch (error) {
            console.error("Failed to load specialties:", error);
        }
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}} value={prefix} onChange={value => setPrefix(value)}>
                <Option value="38">+38</Option>
            </Select>
        </Form.Item>
    );

    useEffect(() => {
        fetchAllClinics();
        fetchAllSpecialties();
    }, []);

    return (
        <>
            <div className={classes.formContainer}>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    initialValues={{prefix: '38'}}
                    layout="horizontal"
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={handleOnFinishForm}
                    form={form}
                >
                    <Form.Item name="firstName"
                               label="First name"
                               rules={[{required:true}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item name="lastName"
                               label="Last name"
                               rules={[{required:true}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item name="birthDate"
                               label="Birth date"
                               rules={[{required:true}]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item name="address"
                               label="Address"
                               rules={[{required:true}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item name="specialty"
                               label="Specialty"
                               rules={[{required:true}]}
                    >
                        <Select>
                            {specialties.map((specialty) => (
                                <Select.Option key={specialty.id}
                                               value={specialty.description}>{specialty.description}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="clinic"
                               label="Clinic"
                               rules={[{required:true}]}
                    >
                        <Select>
                            {clinics.map((clinic) => (
                                <Select.Option key={clinic.id} value={clinic.name}>{clinic.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="Phone number"
                        rules={[
                            {
                                message: 'Please input doctors phone number!',
                            },
                            {
                                required:true,
                            },
                        ]}
                    >
                        <Input
                            placeholder="Doctors phone number"
                            addonBefore={prefixSelector}
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                    <Form.Item name="email"
                               label="Email"
                               rules={[{required:true}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item name="password"
                               label="Password"
                               rules={[{required:true}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Submit">
                        <Button htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}