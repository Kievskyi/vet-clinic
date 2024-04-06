import classes from "./DoctorsAppointment.module.css"
import React, {useEffect, useState} from 'react';
import {Button, Cascader, DatePicker, Form, Input, Radio, Select,} from 'antd';
import {doctors} from "../../../../resources/employee/doctors.js";
import {useDispatch, useSelector} from "react-redux";
import useForm from "antd/es/form/hooks/useForm.js";
import {setCustomerVisit} from "../../../../reducers/userSlice.js";
import {selectUserDataByRole} from "../../../../selectors/selectUserByRole.js";

const {TextArea} = Input;


export default function DoctorsAppointment() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserDataByRole)
    const token = useSelector((state) => state.auth.token);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [clinics, setClinics] = useState([])
    const [date, setDate] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [form] = useForm();

    const initialFormValues = {
        phone: user.userInfo.phoneNumber,
    };

    const handleAddAppointment = async (values) => {
        const petId = values.pet;
        const customerId = user.id;
        const doctorId = values.doctor[1];
        const dateTime = `${values.date.format("YYYY-MM-DD")}T${values.time}:00`;
        const additionalInfo = values.additionalInfo;
        const url = `/api/account/newAppointment?customerId=${customerId}&petId=${petId}`

        const appointment = {
            doctorId: doctorId,
            dateTime: dateTime,
            additionalInfo: additionalInfo,
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointment),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const result = await response.json();

            form.resetFields();
            setAvailableTimes([]);
            setRefreshKey(prevKey => prevKey + 1);
            dispatch(setCustomerVisit(result.customerVisit));
        } catch (error) {
            console.error("Failed to add pet:", error);
        }
    }

    function handleChangeDate(date) {
        setDate(date);
    }

    const handleClinicChange = (value) => {
        setSelectedClinic(value);
        form.resetFields(['doctor']);
    };

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

    const fetchAvailableTimes = async (doctorId, date) => {
        if (!doctorId || !date) return;

        const url = `/api/account/available-slots?doctorId=${doctorId}&date=${date}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Could not fetch available times");
            }

            let availableTimes = await response.json();
            availableTimes = availableTimes.map(time => time.slice(0, 5));
            setAvailableTimes(availableTimes);
        } catch (error) {
            console.error("Failed to load available times:", error);
        }
    };

    useEffect(() => {
        const values = form.getFieldsValue();
        const doctorId = values.doctor?.[1];
        const date = values.date?.format("YYYY-MM-DD");

        if (selectedClinic === null) {
            fetchAllClinics();
        }

        fetchAvailableTimes(doctorId, date);
    }, [date, selectedDoctor, refreshKey]);

    return (
        <>
            <div className={classes.formContainer}>
                <Form
                    initialValues={initialFormValues}
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
                    onFinish={handleAddAppointment}
                    form={form}
                >
                    <Form.Item name="pet"
                               label="Pet"
                               rules={[{required:true}]}
                    >
                        <Select>
                            {user.customerPets.map((pet) => (
                                <Select.Option key={pet.id} value={pet.id}>{pet.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="clinic"
                               label="Clinic"
                               rules={[{required:true}]}
                    >
                        <Select onChange={handleClinicChange}>
                            {clinics.map((clinic) => (
                                <Select.Option key={clinic.id} value={clinic.name}>{clinic.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="doctor"
                               label="Doctor"
                               rules={[{required:true}]}
                    >
                        <Cascader
                            options={
                                Object.keys(doctors)
                                    .map(speciality => {
                                        const filteredDoctors = doctors[speciality].filter(doctor =>
                                            doctor.userInfo.clinic.name === selectedClinic
                                        );

                                        if (filteredDoctors.length > 0) {
                                            return {
                                                label: speciality,
                                                value: speciality,
                                                children: filteredDoctors.map(doctor => ({
                                                    label: `${doctor.userInfo.firstName} ${doctor.userInfo.lastName}`,
                                                    value: doctor.id,
                                                })),
                                            };
                                        }

                                        return null;
                                    })
                                    .filter(option => option !== null)
                            }
                            onChange={(value) => {
                                if (value.length > 1) {
                                    setSelectedDoctor(value[1]);
                                } else {
                                    setSelectedDoctor(null);
                                }
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="date"
                               label="Date"
                               rules={[{required:true}]}
                    >
                        <DatePicker onChange={handleChangeDate}/>
                    </Form.Item>
                    <Form.Item name="time"
                               label="Time"
                               rules={[{required:true}]}
                    >
                        <Radio.Group>
                            {availableTimes.map((time) => (
                                <Radio.Button key={time} value={time}>
                                    {time}
                                </Radio.Button>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="phone"
                               label="Phone"
                               rules={[{required:true}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item name="additionalInfo"
                               label="Additional info">
                        <TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item label="Submit">
                        <Button htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}