import classes from "./VisitHistory.module.css";
import {tags} from "../../../resources/tags/tags.js";
import {useState} from 'react';
import {Modal, Space, Table, Tag} from 'antd';
import tests from "../../../resources/tests.png"
import doctors_report from "../../../resources/doctors_report.png"


const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        clinic: 'VETCLINIC №1',
        tags: [tags[0].operation, tags[0].tests, tags[0].grooming, tags[0].vaccination, tags[0].visit],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        clinic: 'VETCLINIC №2',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        clinic: 'VETCLINIC №2',
        tags: ['cool', 'teacher'],
    },
    {
        key: '4',
        name: 'John Brown',
        age: 32,
        clinic: 'VETCLINIC №1',
        tags: ['nice', 'developer'],
    },
    {
        key: '5',
        name: 'Jim Green',
        age: 42,
        clinic: 'VETCLINIC №1',
        tags: ['loser'],
    },
    {
        key: '6',
        name: 'Joe Black',
        age: 32,
        clinic: 'VETCLINIC №2',
        tags: ['cool', 'teacher'],
    },
    {
        key: '7',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '8',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '9',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '10',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '11',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '12',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '13',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '14',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '15',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const pageSize = 5;

export default function VisitHistory() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isDocReportModalOpen, setIsDocReportModalOpen] = useState(false);
    const [isTestsModalOpen, setIsTestsModalOpen] = useState(false);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Clinic',
            dataIndex: 'clinic',
            key: 'clinic',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags) => (
                <span>
      {tags.map((tag, index) => {
          if (typeof tag === 'string') {
              // Простой текстовый тег
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                  color = 'volcano';
              }
              return <Tag color={color} key={index}>{tag.toUpperCase()}</Tag>;
          } else {
              // Сложный тег с дополнительными параметрами
              const tagStyle = tag.customStyles ? {border: 'none'} : {}; // Применяем кастомные стили, если нужно
              return <Tag color={tag.color} key={tag.name} style={tagStyle}>{tag.name.toUpperCase()}</Tag>;
          }
      })}
    </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={showTestsModal}>Tests</a>
                    <a onClick={showDocReportModal}>Doctor's report</a>
                </Space>
            ),
        },
    ];

    const showDocReportModal = () => {
        setIsDocReportModalOpen(true);
    };

    const showTestsModal = () => {
        setIsTestsModalOpen(true);
    };

    const handleCancelDocRepModal = () => {
        setIsDocReportModalOpen(false);
    };

    const handleCancelTestsModal = () => {
        setIsTestsModalOpen(false);
    };

    // Функция для изменения страницы
    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    };

    return (
        <>
            <div className={classes.historyContainer}>
                <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            position: ["bottom"],
                            current: currentPage,
                            pageSize: pageSize,
                            total: data.length,
                            onChange: (page) => setCurrentPage(page),
                        }}
                        onChange={handleTableChange}
                    />
                </div>
                <Modal open={isTestsModalOpen} onCancel={handleCancelTestsModal}
                       footer={null}
                       width={800}
                >
                    <img src={tests} alt="oops" style={{maxWidth: '100%', height: 'auto'}}/>
                </Modal>
                <Modal open={isDocReportModalOpen} onCancel={handleCancelDocRepModal}
                       footer={null}
                       width={800}
                >
                    <img src={doctors_report} alt="oops" style={{maxWidth: '100%', height: 'auto'}}/>
                </Modal>
            </div>
        </>
    )
}