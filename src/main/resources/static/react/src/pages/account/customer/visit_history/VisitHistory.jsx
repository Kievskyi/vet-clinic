import classes from "./VisitHistory.module.css";
import React, {useState} from 'react';
import {Button, Divider, Modal, Table, Tag} from 'antd';
import {useSelector} from "react-redux";
import {selectUserDataByRole} from "../../../../selectors/selectUserByRole.js";
import ShowAnalyzes from "../../../../components/ShowAnalyzes.jsx";

export default function VisitHistory() {
    const pageSize = 5;
    const user = useSelector(selectUserDataByRole)
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedVisit, setSelectedVisit] = useState({});
    const [isDocReportModalOpen, setIsDocReportModalOpen] = useState(false);
    const [isAnalyzesModalOpen, setIsAnalyzesModalOpen] = useState(false);
    const [refreshModal, setRefreshModal] = useState(0);

    const columns = [
        {
            title: 'Pet name',
            dataIndex: ['pet', 'name'],
            key: 'petName',
            render: (petName) => <span>{petName}</span>,
        },
        {
            title: 'Clinic',
            dataIndex: ['clinic', 'name'],
            key: 'clinicName',
            render: (clinicName) => <span>{clinicName}</span>
        },
        {
            title: 'Visit date',
            dataIndex: 'visitDateTime',
            key: 'visitDate',
            render: (visitDate) => <span>{visitDate}</span>
        },
        {
            title: 'Services',
            key: 'petServices',
            dataIndex: 'petServices',
            render: (service) => (
                <span>
        {service ? service.map((tag) => {
            let color = 'geekblue'; // Значение по умолчанию для color
            if (typeof tag === 'string') {
                color = service.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                    color = 'volcano';
                }
                return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
            } else {
                const tagStyle = {border: 'none'};
                return <Tag color={tag.tagColor} key={tag.id} style={tagStyle}>{tag.description.toUpperCase()}</Tag>;
            }
        }) : ' '}
        </span>
            ),
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
                            onClick={() => openDocReportModal(record)}
                    >
                        Consultation Details
                    </Button>
                    <Divider dashed={true} style={{margin: '5px 0'}}/>
                    <Button className={classes.button}
                            style={{backgroundColor: '#BABAE2'}}
                            onClick={() => openAnalyzesModal(record)}
                    >
                        Analyzes
                    </Button>
                </>
            ),
        },
    ];

    const openDocReportModal = (record) => {
        setSelectedVisit(record);
        setIsDocReportModalOpen(true);
    };

    const openAnalyzesModal = (record) => {
        setRefreshModal(refreshModal + 1);
        setSelectedVisit(record);
        setIsAnalyzesModalOpen(true);
    };

    const handleCloseDocRepModal = () => {
        setIsDocReportModalOpen(false);
    };

    const handleCloseTestsModal = () => {
        setIsAnalyzesModalOpen(false);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    };

    return (
        <>
            <div className={classes.historyContainer}>
                <div>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={user?.customerVisit}
                        pagination={{
                            position: ["bottom"],
                            current: currentPage,
                            pageSize: pageSize,
                            total: user.customerVisit.length,
                            onChange: (page) => setCurrentPage(page),
                        }}
                        onChange={handleTableChange}
                    />
                </div>
                <ShowAnalyzes refresh={refreshModal}
                              isAnalyzesModalOpen={isAnalyzesModalOpen}
                              appointmentId={selectedVisit?.id}
                              handleCancelModal={handleCloseTestsModal}
                />
                <Modal open={isDocReportModalOpen}
                       onCancel={handleCloseDocRepModal}
                       footer={null}
                       width={800}
                >
                    {selectedVisit?.doctorReport == null ? (
                        <>
                            <span>There is no doctor report. Try again later :)</span>
                        </>
                    ) : (
                        <span>{selectedVisit?.doctorReport}</span>
                    )}
                </Modal>
            </div>
        </>
    )
}