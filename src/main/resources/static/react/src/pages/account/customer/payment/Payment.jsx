import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Flex, Pagination} from "antd";
import classes from "./Payment.module.css";
import InvoiceCard from "../../../../components/InvoiceCard.jsx";

export default function Payment() {
    const {userId, token} = useSelector((state) => state.auth);
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetchClientSecret();
    }, []);

    async function fetchClientSecret() {
        const url = `/api/account/all-invoices?userId=${userId}`;

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Could not fetch available appointments");
            }

            const appointments = await response.json();
            const sortedAppointments = sortAppointments(appointments);
            setInvoices(sortedAppointments);
        } catch (error) {
            console.error("Failed to load appointments:", error);
        }
    }

    function sortAppointments(invoices) {
        return [...invoices].sort(
            (a, b) => new Date(b.visitDateTime) - new Date(a.visitDateTime)
        );
    }


    function handleChangePage(page) {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, invoices.length);
    const currentInvoices = invoices.slice(startIndex, endIndex);

    return (
        <>
            <div className={classes.cardContainer}>
                <Flex gap="middle" vertical style={{marginBottom: 20}}>
                    {currentInvoices.map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice}/>
                    ))}
                </Flex>
            </div>
            <div className={classes.pagination}>
                <Pagination
                    current={currentPage}
                    onChange={handleChangePage}
                    total={invoices.length}
                    pageSize={itemsPerPage}
                />
            </div>
        </>
    );
}
