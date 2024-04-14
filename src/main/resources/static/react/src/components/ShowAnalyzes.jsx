import {Modal} from "antd";
import {getDownloadURL, listAll, ref} from "firebase/storage";
import {imageDB} from "../Config.js";
import {useEffect, useState} from "react";

export default function ShowAnalyzes({
                                         refresh,
                                         appointmentId,
                                         isAnalyzesModalOpen,
                                         handleCancelModal,
                                     }) {
    const [fileUrls, setFileUrls] = useState([]);
    const [isError, setIsError] = useState(false);

    const handleCloseModal = () => {
        setIsError(false);
        setFileUrls([]);
        handleCancelModal();
    };

    const handleDownloadFiles = async () => {
        try {
            const fileRef = ref(imageDB, `analyzes/${appointmentId}`);
            const fileList = await listAll(fileRef);

            if (fileList.items.length === 0) {
                setIsError(true); // Если файлы не найдены, устанавливаем isError в true
            } else {
                // Получение URL для каждого файла и добавление их в массив
                const urls = await Promise.all(fileList.items.map(async (item) => {
                    return await getDownloadURL(item);
                }));
                setFileUrls(urls);
            }
        } catch (error) {
            setIsError(true);
            console.error("Error downloading files:", error);
        }
    };

    useEffect(() => {
        if (isAnalyzesModalOpen) {
            handleDownloadFiles();
        }
    }, [refresh]);

    return (
        <>
            <div>
                <Modal open={isAnalyzesModalOpen}
                       onCancel={handleCloseModal}
                       onRequestClose={handleCloseModal}
                       footer={null}
                       width={800}
                >
                    {isError ? (
                        <span>File not found</span>
                    ) : (
                        <div style={{display: "flex", flexDirection: "column", flexWrap: "wrap"}}>
                            {fileUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt=""
                                    style={{width: "100%", objectFit: "cover", margin: "5px"}}
                                />
                            ))}
                        </div>
                    )}
                </Modal>
            </div>
        </>
    )
}