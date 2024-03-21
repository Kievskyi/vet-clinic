import classes from "../main_page/AccountMainPage.module.css";
import {animated, useSpring} from 'react-spring';
import {Avatar, Button, Card, Divider, Input, Skeleton} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {client} from "../../../resources/client.js";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCustomer} from "../../../reducers/customerSlice.js";
import {setAuthData} from "../../../reducers/authSlice.js";

const {Meta} = Card;

export default function MyInformation() {
    const dispatch = useDispatch();
    const {customer, loading} = useSelector((state) => state.customer);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const [active, setActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const style = useSpring({
        config: {duration: 200},
        from: {transform: 'scale(1)'},
        to: {transform: active ? 'scale(1.05)' : 'scale(1)'},
    });

    const handleEditClick = () => {
        setFirstName(customer.customerInfo.firstName);
        setLastName(customer.customerInfo.lastName);
        setEmail(customer.email);
        setPhoneNumber(customer.customerInfo.phoneNumber);
        setIsEditing(!isEditing);
        setActive(!active);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value);
    };


    const handleSubmit = async () => {
        const url = `/api/account/updatePersonalInfo?userId=${userId}`;

        const updatedInfo = {
            firstName,
            lastName,
            phoneNumber,
            email,
        }

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedInfo),
        });

        if (!response.ok) {
            throw new Error("Something went wrong. Status : " + response.statusText + ". Body : " + response.body);
        }

        const responseData = await response.json();

        if (responseData.token) {
            dispatch(setAuthData(responseData))
        }

        dispatch(setCustomer(responseData.customer));

        setIsEditing(!isEditing);
        setActive(!active);
    }

    useEffect(() => {

    }, [customer]);

    if (loading || !customer.customerInfo) {
        return (
            <Skeleton loading={true} avatar active/>
        )
    }

    return (
        <>
            <div className={classes.contentContainer}>
                <div className={classes.contentHeader}>
                    <animated.div style={style}>
                        <Card
                            style={{width: 600, margin: '40px 120px', borderRadius: 15}}
                            actions={[
                                !isEditing && <EditOutlined key="edit" onClick={handleEditClick}/>,
                            ]}
                        >
                            <Skeleton loading={loading} avatar active>
                                <Meta
                                    avatar={<Avatar size={'large'} src={client.avatar}
                                                    style={{position: 'relative', bottom: 10}}/>}
                                    title={
                                        <>
                                            <p style={{fontSize: 22}}>{customer.customerInfo.firstName + ' ' + customer.customerInfo.lastName}</p>
                                            <Divider/>
                                        </>
                                    }
                                    description={
                                        <>
                                            <div style={{fontSize: 18}}>
                                                {isEditing ? (
                                                    <>
                                                        First name: <Input value={firstName}
                                                                           onChange={handleFirstNameChange}
                                                                           style={{marginBottom: 10}}/>
                                                        Last name: <Input value={lastName}
                                                                          onChange={handleLastNameChange}
                                                                          style={{marginBottom: 10}}/>
                                                        Phone number: <Input value={phoneNumber}
                                                                             onChange={handlePhoneChange}
                                                                             style={{marginBottom: 10}}/>
                                                        Email: <Input value={email} onChange={handleEmailChange}
                                                                      style={{marginBottom: 10}}/>
                                                        <Button type={"primary"} onClick={handleSubmit}
                                                                style={{
                                                                    backgroundColor: "rgba(225, 207, 230, 0.49)",
                                                                    color: "black"
                                                                }}>Submit</Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>{`phone: ${customer.customerInfo.phoneNumber}`}</p>
                                                        <p>{`email: ${customer.email}`}</p>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    }
                                />
                            </Skeleton>
                        </Card>
                    </animated.div>
                </div>
            </div>
        </>
    )
}