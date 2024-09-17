import {Button, Form, Input, Modal, Select} from "antd";
import {useEffect, useState} from "react";

const {TextArea} = Input;

export default function ConsultationDetails({
                                                isModalOpen,
                                                handleCancelModal,
                                                token,
                                                openConsultationDetails,
                                                appointment
                                            }) {
    const [services, setServices] = useState([]);
    const [form] = Form.useForm();

    const options = services.map(service => ({
        label: service.description,
        value: service.description,
    }));

    const handleCloseModal = () => {
        form.resetFields();
        handleCancelModal();
    };

    const handlePrint = () => {
        window.print();
    }

    const fetchServices = async () => {
        const url = `/api/clinics/services`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Could not fetch services");
            }

            let services = await response.json();
            setServices(services);
        } catch (error) {
            console.error("Failed to load services:", error);
        }
    };

    const handleFinishConsultation = async (values) => {
        const request = {
            treatments: values.treatments,
            report: values.report,
            customerAppointmentId: appointment.customerVisit.id,
            doctorAppointmentId: appointment.id,
        };

        try {
            const response = await fetch("/api/doctors/appointments/consultation-details", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error("Something went wrong. Status : " + response.statusText + ". Body : " + response.body);
            }

            handleCloseModal();
        } catch (error) {
            console.error('Authorisation failed:', error);
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            form.resetFields();
        }
        fetchServices();
    }, [isModalOpen]);

    return (
        <>
            <Modal open={isModalOpen} onCancel={handleCloseModal}
                   footer={null}
                   width={800}
                   onOk={() => {
                       openConsultationDetails();
                   }}
            >
                <div>
                    <Form name={"details"}
                          onFinish={handleFinishConsultation}
                          form={form}
                    >
                        <span style={{fontSize: 20}}>Provided treatments:</span>
                        <Form.Item name="treatments"
                                   rules={[{required: true}]}
                        >
                            <Select
                                mode="multiple"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                options={options}
                            />
                        </Form.Item>
                        <span style={{fontSize: 20}}>Doctors report:</span>
                        <Form.Item name="report"
                                   rules={[{required: true}]}
                        >
                            <TextArea rows={8}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handlePrint}>Print</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type={"primary"} htmlType={"submit"}>Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}
