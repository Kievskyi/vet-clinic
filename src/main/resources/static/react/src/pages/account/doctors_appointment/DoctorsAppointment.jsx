import classes from "./DoctorsAppointment.module.css"
import React from 'react';
import {Button, Cascader, DatePicker, Form, Input, Select,} from 'antd';
import {client} from "../../../resources/client.js";
import {employee} from "../../../resources/employee/employee.js";

const {TextArea} = Input;


export default function DoctorsAppointment() {

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
                    layout="horizontal"
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item label="Pet">
                        <Select>
                            {client.pets.map((pet) => (
                                <Select.Option value={pet.name}>{pet.name}</Select.Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <Form.Item label="Doctor">
                        <Cascader
                            options={
                                Object.keys(employee[0]).map((speciality) => ({
                                    label: speciality,
                                    value: speciality,
                                    children: Object.keys(employee[0][speciality]).map((key) => {
                                        const doctor = employee[0][speciality][key];
                                        return {
                                            label: `${doctor.name} ${doctor.surname}`,
                                            value: `${doctor.name} ${doctor.surname}`,
                                        };
                                    }),
                                }))}
                        />
                    </Form.Item>
                    <Form.Item label="Date">
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item label="Phone">
                        <Input defaultValue={client.phone}/>
                    </Form.Item>
                    <Form.Item label="Additional info">
                        <TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item label="Submit">
                        <Button>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}