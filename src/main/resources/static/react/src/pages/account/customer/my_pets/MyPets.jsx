import classes from "./MyPets.module.css"
import {useState} from "react";
import PetCard from "../../../../components/PetCard.jsx";
import {Button, Card, DatePicker, Form, Input, Modal, Skeleton} from "antd";
import plusIcon from "../../../../resources/icons/plus.png"
import {useDispatch, useSelector} from "react-redux";
import {setAuthData} from "../../../../reducers/authSlice.js";
import {setCustomerPets} from "../../../../reducers/userSlice.js";
import {useForm} from "antd/es/form/Form.js";

export default function MyPets() {
    const dispatch = useDispatch();
    const {token, userId} = useSelector((state) => state.auth)
    const pets = useSelector((state) => state.user.customer.customerPets) || []
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm();

    const handleDelete = async (index) => {
        const url = `/api/account/deletePet?customerId=${userId}&petId=${index}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error("Something went wrong. Status : " + response.statusText + ". Body : " + response.body);
        }

        const responseData = await response.json();

        if (responseData.token) {
            dispatch(setAuthData(responseData))
        }

        dispatch(setCustomerPets(responseData.customerPets));
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleAdd = async (values) => {
        const url = `/api/account/addNewPet?customerId=${userId}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    name: values.name,
                    type: values.type,
                    breed: values.breed,
                    birthDate: values.born.format('YYYY-MM-DD'),
                }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseData = await response.json();

            dispatch(setCustomerPets(responseData.customerPets));
        } catch (error) {
            console.error("Failed to add pet:", error);
        }

        form.resetFields();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <div className={classes.petsContainer}>
            {pets.map((pet) => (
                <PetCard
                    key={pet.id}
                    pet={pet}
                    onDelete={() => handleDelete(pet.id)}
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
            <Modal title="Add new pet"
                   open={isModalOpen}
                   onOk={handleAdd}
                   onCancel={handleCancel}
                   footer={null}
            >
                <Form
                    labelCol={{span: 4,}}
                    wrapperCol={{span: 14,}}
                    style={{maxWidth: 600,}}
                    layout="horizontal"
                    onFinish={handleAdd}
                    form={form}
                >
                    <Form.Item name="name" label="Name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="type" label="Type" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="breed" label="Breed" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="born" label="Born" rules={[{required: true}]}>
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