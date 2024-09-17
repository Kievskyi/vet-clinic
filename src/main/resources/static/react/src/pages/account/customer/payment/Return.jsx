import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Button, Result} from "antd";

export default function Return() {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const token = useSelector((state) => state.auth.token);
    const invoiceId = useSelector((state) => state.invoice.id);
    const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`/api/customers/checkout-sessions/${sessionId}/status?invoiceId=${invoiceId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
    }, []);

    if (status === 'open') {
        return (
            <Navigate to="/api/payment"/>
        )
    }

    if (status === 'complete') {
        return (
            <div>
                <Result
                    status="success"
                    title="Purchase was successfull!"
                    subTitle="Thank you :)"
                    extra={[
                        <Button type="primary" key="console" onClick={() => navigate('/account/payment')}>
                            Return
                        </Button>
                    ]}
                />
            </div>
        )
    }

    return null;
}