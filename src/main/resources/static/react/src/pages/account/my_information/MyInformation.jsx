import classes from "../main_page/AccountMainPage.module.css";
import {animated, useSpring} from 'react-spring';
import {Avatar, Button, Card, Divider, Input, Skeleton} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {client} from "../../../resources/client.js";
import {useEffect, useState} from "react";

const {Meta} = Card;

export default function MyInformation() {
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState(client.email);
    const [phone, setPhone] = useState(client.phone);

    const style = useSpring({
        config: {duration: 200},
        from: {transform: 'scale(1)'},
        to: {transform: active ? 'scale(1.05)' : 'scale(1)'},
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        setActive(!active);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    function handleNewInfo() {
        setIsEditing(false);
        setActive(!active);
    }

    useEffect(() => {

    }, [active]);

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
                                            <p style={{fontSize: 22}}>{client.name + ' ' + client.surname}</p>
                                            <Divider/>
                                        </>
                                    }
                                    description={
                                        <>
                                            <div style={{fontSize: 18}}>
                                                {isEditing ? (
                                                    <>
                                                        <Input value={phone} onChange={handlePhoneChange}
                                                               style={{marginBottom: 10}}/>
                                                        <Input value={email} onChange={handleEmailChange}
                                                               style={{marginBottom: 10}}/>
                                                        <Button type={"primary"} onClick={handleNewInfo}
                                                        style={{backgroundColor: "rgba(225, 207, 230, 0.49)", color: "black"}}>Submit</Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>{`phone: ${phone}`}</p>
                                                        <p>{`email: ${email}`}</p>
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