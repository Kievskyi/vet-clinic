import classes from "../main_page/AccountMainPage.module.css";
import {animated, useSpring} from 'react-spring';
import {Avatar, Button, Card, Divider, Input, Skeleton} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {client} from "../../../resources/client.js";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAuthData} from "../../../reducers/authSlice.js";
import {selectUserDataByRole} from "../../../selectors/selectUserByRole.js";
import {setAdministrator, setCustomer, setDoctor, setLoading} from "../../../reducers/userSlice.js";

const {Meta} = Card;

export default function MyInformation() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.loading);
    const user = useSelector(selectUserDataByRole);
    const {token, userId} = useSelector((state) => state.auth);
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
        setFirstName(user.userInfo.firstName);
        setLastName(user.userInfo.lastName);
        setPhoneNumber(user.userInfo.phoneNumber);
        setEmail(user.email);
        setIsEditing(!isEditing);
        setActive(!active);
    };

    function handleDispatchUserByRole(responseData) {
        dispatch(setLoading(true));
        if (user.role === "CUSTOMER") {
            dispatch(setCustomer(responseData.customer));
        } else if (user.role === "DOCTOR") {
            dispatch(setDoctor(responseData.doctor));
        } else if (user.role === "ADMINISTRATOR") {
            dispatch(setAdministrator(responseData.administrator));
        }
        dispatch(setLoading(false));
    }

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

        handleDispatchUserByRole(responseData);

        setIsEditing(!isEditing);
        setActive(!active);
    }


    if (isLoading) {
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
                            <Skeleton loading={isLoading} avatar active>
                                <Meta
                                    avatar={<Avatar size={'large'} src={client.avatar}
                                                    style={{position: 'relative', bottom: 10}}/>}
                                    title={
                                        <>
                                            <p style={{fontSize: 22}}>{user?.userInfo.firstName + ' ' + user?.userInfo.lastName}</p>
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
                                                        <p>{`phone: ${user?.userInfo.phoneNumber}`}</p>
                                                        <p>{`email: ${user?.email}`}</p>
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