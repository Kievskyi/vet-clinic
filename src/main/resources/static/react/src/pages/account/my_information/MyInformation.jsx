import classes from "../main_page/AccountMainPage.module.css";
import {animated, useSpring} from 'react-spring';
import {Avatar, Button, Card, Divider, Input, message, Skeleton, Upload} from "antd";
import {EditOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAuthData} from "../../../reducers/authSlice.js";
import {selectUserDataByRole} from "../../../selectors/selectUserByRole.js";
import {setAdministrator, setAvatar, setCustomer, setDoctor, setLoading} from "../../../reducers/userSlice.js";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {imageDB} from "../../../Config.js";
import {client} from "../../../resources/client.js"

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const {Meta} = Card;

export default function MyInformation() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.loading);
    const avatar = useSelector((state) => state.user.avatar);
    const user = useSelector(selectUserDataByRole);
    const {token, userId} = useSelector((state) => state.auth);
    const [active, setActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [fileLoading, setFileLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleChange = async (info) => {
        if (info.file.status === 'uploading') {
            setFileLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setFileLoading(false);
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {fileLoading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const handleUploadFile = async (file) => {
        const imgRef = ref(imageDB, `user_avatars/${userId}`);
        try {
            await uploadBytes(imgRef, file);
            return await getDownloadURL(imgRef);
        } catch (error) {
            console.error('Error uploading file to Firebase:', error);
            throw error;
        }
    };

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
                                    avatar={isEditing ? (
                                        <Upload
                                            name="avatar"
                                            listType="picture-circle"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            customRequest={({file}) => {
                                                handleUploadFile(file)
                                                    .then((url) => {
                                                        dispatch(setAvatar(url));
                                                        setImageUrl(url);
                                                    })
                                                    .catch((error) => {
                                                        console.error('Error uploading file:', error);
                                                    });
                                            }}
                                            beforeUpload={beforeUpload}
                                            onChange={handleChange}
                                        >
                                            {imageUrl ? (

                                                <img
                                                    src={avatar}
                                                    alt="avatar"
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        objectFit: 'cover',
                                                        borderRadius: '50%',
                                                        display: 'block',
                                                    }}
                                                />

                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                    ) : (
                                        <Avatar size={'large'} src={avatar != null ? avatar : client.avatar}
                                                style={{position: 'relative', bottom: 10}}/>
                                    )}
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