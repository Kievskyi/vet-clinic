import {useCallback} from "react";
import {useSelector} from "react-redux";
import {loadStripe} from "@stripe/stripe-js";
import {EmbeddedCheckout, EmbeddedCheckoutProvider} from '@stripe/react-stripe-js';
import classes from "./Payment.module.css"
import {Skeleton} from "antd";

const stripePromise = loadStripe("pk_test_51P2srwJriED6n5QKwZab9KPpdf3mG5EQ1IvAHp3eOrpLU9xIUJF353KOZPwgfUxq2n5PKAFo5r8P62PROLxC6gBi00QoVqxKBq");

export default function CheckoutLink() {
    const token = useSelector((state) => state.auth.token);
    const invoiceId = useSelector((state) => state.invoice.id);
    const isLoading = useSelector((state) => state.invoice.isLoading);
    const fetchClientSecret = useCallback(() => {
        return fetch(`/api/account/create-checkout-session?invoiceId=${invoiceId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret)
    }, []);

    const options = {fetchClientSecret};

    if (isLoading) {
        return (
            <Skeleton loading={true} avatar active/>
        )
    }

    return (
        <>
            <div className={classes.form} id="checkout">
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={options}
                >
                    <EmbeddedCheckout/>
                </EmbeddedCheckoutProvider>
            </div>
        </>
    )
}