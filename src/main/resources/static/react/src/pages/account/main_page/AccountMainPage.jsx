import classes from "./AccountMainPage.module.css"
import React from 'react';
import {ContactsOutlined, FormOutlined, HistoryOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Layout, Menu} from 'antd';
import {Link, Outlet} from "react-router-dom";
import {client} from "../../../resources/client.js"
import paw from "../../../resources/icons/paw.png"
import paymentIcon from "../../../resources/icons/payment.png"
import {Content} from "antd/es/layout/layout.js";
import Logotype from "../../../components/Logotype.jsx";
import logo from "../../../resources/logo/new_logo.jpeg"

const {Header, Sider} = Layout;

const PawIcon = ({alt = " ", ...props}) => (
    <img src={paw} alt={alt} {...props} />
);

const PaymentIcon = ({alt = " ", ...props}) => (
    <img src={paymentIcon} alt={alt} {...props} />
);

const items = [
    {
        name: <Link to={"info"}>My information</Link>,
        icon: () => <Link to={"info"}><UserOutlined/></Link>,
    },
    {
        name: <Link to={"my-pets"}>My pets</Link>,
        icon: () => <Link to={"my-pets"}><PawIcon alt={"oops"} style={{width: 15, height: 15}}/></Link>,
    },
    {
        name: <Link to={"visit-history"}>Visit history</Link>,
        icon: () => <Link to={"visit-history"}><HistoryOutlined/></Link>,
    },
    {
        name: <Link to={"appointment"}>{"Doctor's appointment"}</Link>,
        icon: () => <Link to={"appointment"}><ContactsOutlined/></Link>,
    },
    {
        name: <Link to={"feedback"}>Feedback</Link>,
        icon: () => <Link to={"/feedback"}><FormOutlined/></Link>
    },
    {
        name: <Link to={"payment"}>Payment</Link>,
        icon: () => <Link to={"/payment"}><PaymentIcon alt={"oops"} style={{width: 15, height: 15}}/></Link>
    }
].map(
    (item, index) => ({
        key: String(index + 1),
        icon: typeof item.icon === 'function' ? item.icon() : React.createElement(item.icon),
        label: item.name,
    }),
);

export default function AccountMainPage() {

    return (
        <>
            <Layout className={classes.layoutHeader}>
                <Header className={classes.header}>
                    <div className={classes.headerContainer}>
                        <div className={classes.logoContainer}>
                            <div className={classes.logo} style={{fontSize: 20}}>
                                <div className={classes.logo}>
                                    <Avatar src={client.avatar}/>
                                </div>
                                <div className={classes.greetingTextContainer}>
                                    <p className={classes.greetingText}>Hello,</p>
                                    {client.name + " " + client.surname}
                                </div>
                            </div>
                            <div>
                                <Link to="/authentication">
                                    <LogoutOutlined style={{height: "2em", width: "2em", color: "grey"}}
                                                    className={classes.logoutIcon}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={classes.logoHeaderAccountContainer}>
                        <Logotype path="/account" image={logo} className={classes.logoHeaderAccount}/>
                    </div>
                </Header>
            </Layout>
            <Layout className={classes.layoutSiderAndContent}>
                <Sider
                    theme="light"
                    className={classes.sider}>
                    <Menu className={classes.menu} theme="light" mode="inline"
                          items={items}/>
                </Sider>
                <Layout className={classes.contentLayout} style={{backgroundColor: "white"}}>
                    <Content className={classes.content}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}