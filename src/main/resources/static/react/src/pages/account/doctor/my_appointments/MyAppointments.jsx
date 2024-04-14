import {Button, DatePicker, Divider, Skeleton, Table, Tag} from 'antd';
import React, {useEffect, useState} from "react";
import ConsultationDetails from "../../../../components/ConsultationDetails.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setAppointmentsLoading} from "../../../../reducers/userSlice.js";
import classes from "./MyAppointments.module.css"
import AddAnalyzes from "../../../../components/AddAnalyzes.jsx";
import CustomerInfoModal from "../../../../components/CustomerInfoModal.jsx";

export default function MyAppointments() {
    const pageSize = 5;
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAnalyzesModalOpen, setIsAnalyzesModalOpen] = useState(false);
    const [isCustomerInfoModalOpen, setIsCustomerInfoModalOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [activeAppointment, setActiveAppointment] = useState(null);
    const {token, userId} = useSelector((state) => state.auth);
    const isAppointmentsLoading = useSelector((state) => state.user.isAppointmentsLoading)

    const sortedAppointments = [...filteredAppointments].sort((a, b) => new Date(b.visitDateTime) - new Date(a.visitDateTime));

    const columns = [
        {
            title: 'Pet',
            dataIndex: ['pet', 'name'],
            key: 'pet',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Customer',
            key: 'customer',
            render: (data) => (
                <a style={{color: "pink", fontWeight: 'bold'}}
                    onClick={() => openCustomerInfoModal(data)}>
                        {data.customer.userInfo.firstName} {data.customer.userInfo.lastName}
                    </a>
            )
        },
        {
            title: 'Date',
            key: 'date',
            render: (record) => {
                const dateTimeString = record.visitDateTime;
                const dateString = dateTimeString.split('T')[0];
                return <span>{dateString}</span>;
            },
        },
        {
            title: 'Time',
            key: 'time',
            render: (record) => {
                const dateTimeString = record.visitDateTime;
                const timeString = dateTimeString.split('T')[1];
                return <span>{timeString}</span>;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span>
            {typeof status === 'string' ? (
                (() => {
                    let color;
                    if (status === 'FINISHED') {
                        color = 'volcano';
                    } else {
                        color = "yellow"
                    }
                    return <Tag color={color} key={status}>{status}</Tag>;
                })()
            ) : (
                <Tag color={status === "FINISHED" ? "volcano" : "yellow"} key={status}
                     style={{border: 'none'}}>{status}</Tag>
            )}
        </span>
            )
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button className={classes.button}
                            style={{backgroundColor: '#CBEDE2'}}
                            onClick={() => openDetailsModal(record)}
                    >
                        Consultation Details
                    </Button>
                    <Divider dashed={true} style={{margin: '5px 0'}}/>
                    <Button className={classes.button}
                            style={{backgroundColor: '#BABAE2'}}
                            onClick={() => openAnalyzesModal(record)}
                    >
                        Add analyzes
                    </Button>
                </>
            ),
        },
    ];

    const handleCancelModal = () => {
        setIsDetailsModalOpen(false);
        setIsAnalyzesModalOpen(false);
        setIsCustomerInfoModalOpen(false);
    };

    const openDetailsModal = (appointment) => {
        setActiveAppointment(appointment);
        setIsDetailsModalOpen(true);
    };

    const openAnalyzesModal = (appointment) => {
        setActiveAppointment(appointment);
        setIsAnalyzesModalOpen(true);
    };

    const openCustomerInfoModal = (appointment) => {
        console.log(appointment);
        setActiveAppointment(appointment);
        setIsCustomerInfoModalOpen(true);
    }


    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    };

    const handleChangeDateOfVisits = (date) => {
        if (!date) {
            setFilteredAppointments(appointments); // Если дата не выбрана, показать все визиты
            return;
        }

        const formattedDate = date.format("YYYY-MM-DD");
        const filtered = appointments.filter((appointment) => {
            const appointmentDate = appointment.visitDateTime.split('T')[0];
            return appointmentDate === formattedDate;
        });

        setFilteredAppointments(filtered);
    };

    const handleFetchAppointments = async () => {
        const url = `/api/doctor/all-appointments?userId=${userId}`;
        dispatch(setAppointmentsLoading(true));

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Could not fetch available appointments");
            }

            let appointments = await response.json();
            setAppointments(appointments);
            setFilteredAppointments(appointments);
        } catch (error) {
            console.error("Failed to load appointments:", error);
        } finally {
            dispatch(setAppointmentsLoading(false));
        }
    }

    useEffect(() => {
        handleFetchAppointments();
    }, []);

    if (isAppointmentsLoading) {
        return (
            <Skeleton loading={true} avatar active/>
        )
    }

    return (
        <>
            <div className={classes.appointmentsContainer}>
                <DatePicker size={"large"} className={classes.datePicker} onChange={handleChangeDateOfVisits}/>
                <Table
                    columns={columns}
                    onChange={handleTableChange}
                    dataSource={sortedAppointments}
                    pagination={{
                        position: ["bottom"],
                        current: currentPage,
                        pageSize: pageSize,
                        total: sortedAppointments.length,
                        onChange: (page) => setCurrentPage(page),
                    }}

                />
                <ConsultationDetails
                    appointment={activeAppointment}
                    isModalOpen={isDetailsModalOpen}
                    handleCancelModal={handleCancelModal}
                    token={token}
                    openConsultationDetails={openDetailsModal}
                />
                <AddAnalyzes
                    appointment={activeAppointment}
                    isAnalyzesModalOpen={isAnalyzesModalOpen}
                    handleCancelModal={handleCancelModal}
                    token={token}
                    openAnalyzesModal={openAnalyzesModal}
                />
                <CustomerInfoModal
                    isCustomerInfoModalOpen={isCustomerInfoModalOpen}
                    customerInfo={activeAppointment}
                    handleCloseModal={handleCancelModal}
                    openCustomerInfoModal={openCustomerInfoModal}
                />
            </div>
        </>
    )
}