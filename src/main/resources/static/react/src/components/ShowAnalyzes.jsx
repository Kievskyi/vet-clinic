import {Modal} from "antd";
import {getDownloadURL, ref} from "firebase/storage";
import {imageDB} from "../Config.js";
import {useEffect, useState} from "react";

export default function ShowAnalyzes({
                                         refresh,
                                         appointmentId,
                                         isAnalyzesModalOpen,
                                         handleCancelModal,
                                     }) {
    const [fileUrl, setFileUrl] = useState([]);
    const [isError, setIsError] = useState(false);

    const handleCloseModal = () => {
        setIsError(false);
        setFileUrl([]);
        handleCancelModal();
    };

    const handleDownloadFile = () => {
        const fileRef = ref(imageDB, `analyzes/${appointmentId}`);
        getDownloadURL(fileRef)
            .then((url) => {
                setFileUrl([url]);
            })
            .catch((error) => {
                setIsError(true);
                console.error("Error downloading file:", error);
            });
    };

    useEffect(() => {
        if (isAnalyzesModalOpen) {
            handleDownloadFile();
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
                        <div style={{maxWidth: "100%", overflow: "auto"}}>
                            <img src={fileUrl[0]}
                                 alt=""
                                 style={{maxWidth: "100%", height: "auto"}}
                            />
                        </div>
                    )}
                </Modal>
            </div>
        </>
    )
}