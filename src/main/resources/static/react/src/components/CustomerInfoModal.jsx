import {Form, Modal} from "antd";

export default function CustomerInfoModal({
                                              customerInfo,
                                              handleCloseModal,
                                              isCustomerInfoModalOpen,
                                              openCustomerInfoModal
                                          }) {

    return (
        <>
            <div>
                <Modal open={isCustomerInfoModalOpen} onCancel={handleCloseModal}
                       footer={null}
                       width={500}
                       onOk={() => {
                           openCustomerInfoModal();
                       }}>
                    <Form>
                        <Form.Item>
                            <span>{customerInfo?.customer.email}</span>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}