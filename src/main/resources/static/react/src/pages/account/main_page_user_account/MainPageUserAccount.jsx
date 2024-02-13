import "./MainPageUserAccount.module.css"
import React from 'react';
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';

const {Header, Content, Sider} = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: `nav ${index + 1}`,
    }),
);

export default function MainPageUserAccount() {

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout style={{height: "100vh", width: "100vw",}}>
            <Sider
                style={{backgroundColor: "rgba(170, 211, 223, 0.22)"}}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" style={{
                    height: "32px",
                    margin: "16px",
                    background: "rgba(255,255,255,.2)",
                    borderRadius: "6px",
                }}></div>
                <Menu style={{backgroundColor: "rgba(170, 211, 223, 0.22)"}} theme="light" mode="inline"
                      defaultSelectedKeys={['4']} items={items}/>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            height: "85vh",
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        content
                    </div>
                </Content>
                {/*<Footer*/}
                {/*    style={{*/}
                {/*        textAlign: 'center',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Ant Design ©{new Date().getFullYear()} Created by Ant UED*/}
                {/*</Footer>*/}
            </Layout>
        </Layout>
    )
}