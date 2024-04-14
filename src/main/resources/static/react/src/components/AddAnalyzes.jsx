import {message, Modal, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {getDownloadURL, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage';
import {imageDB} from '../Config.js';
import {useState} from "react";

export default function AddAnalyzes({
                                        isAnalyzesModalOpen,
                                        handleCancelModal,
                                        openAnalyzesModal,
                                        appointment,
                                    }) {
    const [uploadPercent, setUploadPercent] = useState(0);


    const handleCloseModal = () => {
        handleCancelModal();
    };

    const handleUploadFile = async ({file, onError, onSuccess, onProgress}) => {
        const imgRef = ref(imageDB, `analyzes/${appointment.customerVisit.id}/${file.name}`);
        const uploadTask = uploadBytesResumable(imgRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Отслеживание прогресса загрузки
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPercent(progress); // Обновление состояния для отображения прогресса
                onProgress({percent: progress});
            },
            (error) => {
                onError(error);
                message.error(`${file.name} file upload failed.`);
                console.error('Error uploading file to Firebase:', error);
                throw error;
            },
            () => {
                // Загрузка завершена успешно
                onSuccess(null, uploadTask.snapshot);
                message.success(`${file.name} file uploaded successfully.`);
            }
        );

        try {
            // Запуск загрузки файла
            await uploadBytes(imgRef, file);
            return await getDownloadURL(imgRef);
        } catch (error) {
            // Если произошла ошибка при загрузке
            onError(error);
            message.error(`${file.name} file upload failed.`);
            console.error('Error uploading file to Firebase:', error);
            throw error;
        }
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {

        }
    };

    const props = {
        name: 'file',
        multiple: true,
        customRequest: handleUploadFile,
        onChange: handleChange,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Modal
            visible={isAnalyzesModalOpen}
            onCancel={handleCloseModal}
            footer={null}
            width={800}
            onOk={openAnalyzesModal}
        >
            <Upload.Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
                    files.
                </p>
            </Upload.Dragger>
        </Modal>
    );
}
