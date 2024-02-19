import classes from "./MyPets.module.css"
import {client} from "../../../resources/client.js";
import {useState} from "react";
import {Card, Divider, Skeleton} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

const {Meta} = Card;

export default function MyPets() {
    const [loading, setLoading] = useState(false);
    const onChange = (checked) => {
        setLoading(!checked);
    };

    return (
        <>
            <div className={classes.petsContainer}>
                {client.pets.map((pet, index) => (
                    <div className={classes.pet}>
                        <Card
                            key={index + 1}
                            style={{
                                width: 300,
                                margin: "40px ",
                                borderRadius: 15,
                                boxShadow: "0 7px 16px rgba(169,176,202,.25)",
                            }}
                            actions={[
                                <EditOutlined key="edit"/>,
                                <DeleteOutlined key="delete"/>,
                            ]}
                        >
                            <Skeleton loading={loading} avatar active>
                                <Meta
                                    title={
                                        <>
                                            <p style={{fontSize: 22}}>{pet.name}</p>
                                            <Divider/>
                                        </>
                                    }
                                    description={
                                        <>
                                            <div style={{fontSize: 18}}>
                                                <p>Type: {pet.type}</p>
                                                <p>Breed: {pet.breed}</p>
                                                <p>Age: {pet.age}</p>
                                            </div>
                                        </>
                                    }
                                />
                            </Skeleton>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    )
}