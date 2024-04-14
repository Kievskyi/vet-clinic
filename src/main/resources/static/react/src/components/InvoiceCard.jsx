import {Button, Card, Flex, Tag} from "antd";
import classes from "../pages/account/customer/payment/Payment.module.css";
import {CheckCircleOutlined} from "@ant-design/icons";
import React from "react";
import {setInvoiceId} from "../reducers/invoiceSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function InvoiceCard({invoice}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleNavigateToCheckout(id) {
        dispatch(setInvoiceId(id));
        navigate("/checkout-page");
    }

    return (
        <Card key={invoice.id} hoverable style={{width: "80%", height: "auto"}}>
            <div className={classes.flexContainer}>
                <Flex align="center" justify="space-around">
                    <Flex
                        align="start"
                        justify="space-around"
                        vertical
                        style={{width: 200}}
                    >
              <span style={{fontSize: 24, fontWeight: "bold"}}>
                {invoice.petName}
              </span>
                        <span>{new Date(invoice.visitDateTime).toLocaleDateString()}</span>
                        <span>{new Date(invoice.visitDateTime).toLocaleTimeString()}</span>
                    </Flex>
                    <Flex
                        align="start"
                        justify="space-around"
                        vertical
                        style={{width: 150}}
                    >
                        <span style={{fontSize: 18}}>{invoice.totalAmount} USD</span>
                    </Flex>

                    {invoice.paymentStatus === "UNPAID" ? (
                        <Button
                            className={classes.payButton}
                            onClick={() => handleNavigateToCheckout(invoice.id)}
                            type="primary"
                        >
                            Pay
                        </Button>
                    ) : (
                        <Tag icon={<CheckCircleOutlined/>} color="success">
                            PAID
                        </Tag>
                    )}
                </Flex>
            </div>
        </Card>
    );
}