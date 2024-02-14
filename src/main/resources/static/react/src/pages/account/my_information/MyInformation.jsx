import classes from "./MyInformation.module.css";
import {Avatar, Card, Skeleton} from "antd";
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
                            width: 400,
                            margin: 50,
                            borderRadius: 15,
                            boxShadow: "0 7px 16px rgba(169,176,202,.25)",
                        }}
                        actions={[
                            <EditOutlined key="edit"/>,
                        ]}
                    >
                        <Skeleton loading={loading} avatar active>
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>}
                                title={client.name + " " + client.surname}
                                description={
                                    <>
                                        <p>{`phone: ${client.phone_number}`}</p>
                                        <p>{`email: ${client.email}`}</p>
                                    </>
                                }
                            />
                        </Skeleton>
                    </Card>
                </div>
                <div className={classes.contentAnimal}>
                </div>
            </div>
        </>
    )
}