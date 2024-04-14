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
                            <label>Email:</label>
                            <br/>
                            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(customerInfo?.customer.email)}`}
                               target="_blank" rel="noopener noreferrer">{customerInfo?.customer.email}</a>
                            <br/><br/>
                            <label>Phone number:</label><br/>
                            <a href={`tel:${customerInfo?.customer.userInfo.phoneNumber}`}>{customerInfo?.customer.userInfo.phoneNumber}</a>

                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}