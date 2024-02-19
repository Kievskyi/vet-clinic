import classes from "../main_page/AccountMainPage.module.css";
import {Avatar, Card, Divider, Skeleton} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {client} from "../../../resources/client.js";
import {useState} from "react";

const {Meta} = Card;

export default function MyInformation() {
    const [loading, setLoading] = useState(false);
    const onChange = (checked) => {
        setLoading(!checked);
    };

    return (
        <>
            <div className={classes.contentContainer}>
                <div className={classes.contentHeader}>
                    <Card
                        style={{
                            width: 600,
                            margin: 39,
                            borderRadius: 15,
                            boxShadow: "0 7px 16px rgba(169,176,202,.25)",
                        }}
                        actions={[
                            <EditOutlined key="edit"/>,
                        ]}
                    >
                        <Skeleton loading={loading} avatar active>
                            <Meta
                                avatar={<Avatar size={"large"} src={client.avatar}
                                                style={{position: "relative", bottom: 10}}/>}
                                title={
                                    <>
                                        <p style={{fontSize: 22}}>{client.name + " " + client.surname}</p>
                                        <Divider/>
                                    </>
                                }
                                description={
                                    <>
                                        <div style={{fontSize: 18}}>
                                            <p>{`phone: ${client.phone}`}</p>
                                            <p>{`email: ${client.email}`}</p>
                                        </div>
                                    </>
                                }
                            />
                        </Skeleton>
                    </Card>
                </div>
            </div>
        </>
    )
}