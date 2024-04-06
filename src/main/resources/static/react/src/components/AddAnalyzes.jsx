import {Form, Modal} from "antd";
import Title from "antd/es/skeleton/Title.js";
import {ref, uploadBytes} from "firebase/storage";
import {imageDB} from "../Config.js";
import {useState} from "react";

export default function AddAnalyzes({
                                        isAnalyzesModalOpen,
                                        handleCancelModal,
                                        openAnalyzesModal,
                                        appointment
                                    }) {
    const [file, setFile] = useState('');


    const handleCloseModal = () => {
        handleCancelModal();
    };

    const handleUploadFile = () => {
        if (file !== null) {
            const imgRef = ref(imageDB, `analyzes/${appointment.customerVisit.id}`);
            uploadBytes(imgRef, file).then(value => {
                console.log(value);
            });
        }
    }

    return (
        <>
            <div>
                <Modal open={isAnalyzesModalOpen} onCancel={handleCloseModal}
                       footer={null}
                       width={800}
                       onOk={() => {
                           openAnalyzesModal();
                       }}>
                    <Form>
                        <Form.Item>
                            <Title level={4}>Upload analyzes :</Title>
                            <input type={"file"} onChange={(e) => setFile(e.target.files[0])}/>
                            <button onClick={handleUploadFile}>Upload</button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}