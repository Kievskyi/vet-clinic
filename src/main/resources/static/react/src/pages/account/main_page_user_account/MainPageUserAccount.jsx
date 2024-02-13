import classes from "./MainPageUserAccount.module.css"
import React from 'react';
import {LogoutOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

const {Header, Content, Sider} = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: `nav ${index + 1}`,
    }),
);

export default function MainPageUserAccount() {

    return (
        <Layout className={classes.layout}>
            <Sider
                className={classes.sider}>
                <div className={classes.logoSider}>
                    Name<Link to="/authentication">
                    <LogoutOutlined />
                </Link>
                </div>
                <Menu className={classes.menu} theme="light" mode="inline"
                      defaultSelectedKeys={['4']} items={items}/>
            </Sider>
            <Layout>
                <Header className={classes.header}/>
                <Content className={classes.content}>
                    <div className={classes.contentContainer}>
                        content
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}