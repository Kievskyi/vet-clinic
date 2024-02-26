import classes from "./MyPets.module.css"
import {client} from "../../../resources/client.js";
import {useState} from "react";
import PetCard from "../../../components/PetCard.jsx";
import {Button, Card, DatePicker, Form, Input, Modal, Skeleton} from "antd";
import plusIcon from "../../../resources/icons/plus.png"

export default function MyPets() {
    const [pets, setPets] = useState(client.pets);

    const handleDelete = (index) => {
        setPets(currentPets => currentPets.filter((_, i) => i !== index));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleAdd = (pet) => {
        console.log(pet)
        if (pet.born) {
            // Преобразование в объект Date
            const bornDate = pet.born.toDate();
            console.log(bornDate); // Теперь это объект Date, который вы можете использовать

            // ИЛИ преобразование в строку
            const bornDateString = pet.born.format('YYYY-MM-DD');
            console.log(bornDateString);
            pet.born = new Date(bornDateString);
        }
        client.pets.push(pet);
        setPets([...client.pets]);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={classes.petsContainer}>
            {pets.map((pet, index) => (
                <PetCard
                    key={index}
                    pet={pet}
                    onDelete={() => handleDelete(index)}
                />
            ))}

            <Card
                style={{
                    width: 300,
                    height: 218,
                    margin: "40px",
                    borderRadius: 15,
                    boxShadow: "0 7px 16px rgba(169,176,202,.25)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}
                onClick={showModal}
            >
                <Skeleton loading={false} avatar active>
                    <img src={plusIcon} className={classes.newPet} alt={"oops"}></img>
                </Skeleton>
            </Card>
            <Modal title="Add new pet" open={isModalOpen} onOk={handleAdd} onCancel={handleCancel}
                   footer={null}>
                <Form
                    labelCol={{span: 4,}}
                    wrapperCol={{span: 14,}}
                    style={{maxWidth: 600,}}
                    layout="horizontal"
                    onFinish={handleAdd}
                >
                    <Form.Item name="name" label="Name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="type" label="Type" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="breed" label="Breed">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="born" label="Born">
                        <DatePicker format="YYYY-MM-DD"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}