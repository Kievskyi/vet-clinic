import classes from "./my_information/MyInformation.module.css"
import React from 'react';
import {ContactsOutlined, HistoryOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Layout, Menu} from 'antd';
import {Link, Outlet} from "react-router-dom";
import {client} from "../../resources/client.js"
import paw from "../../resources/icons/paw.png"
import {Content} from "antd/es/layout/layout.js";

const {Header, Sider} = Layout;

const PawIcon = ({alt = " ", ...props}) => (
    <img src={paw} alt={alt} {...props} />
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
            <Header className={classes.header}/>
            <Layout className={classes.layout}>
                <Sider
                    theme="light"
                    className={classes.sider}>
                    <div className={classes.logoSiderContainer}>
                        <div className={classes.logoSider} style={{fontSize: 20}}>
                            <div className={classes.logo}>
                                <Avatar icon={<UserOutlined/>}/>
                            </div>
                            <div className={classes.greetingTextContainer}>
                                <p className={classes.greetingText}>Hello,</p>
                                {client.name + " " + client.surname}
                            </div>

                        </div>
                        <div>
                            <Link to="/authentication">
                                <LogoutOutlined style={{height: "2em", width: "2em", color: "grey"}}/>
                            </Link>
                        </div>
                    </div>
                    <Menu className={classes.menu} theme="light" mode="inline"
                          items={items}/>
                </Sider>
                <Layout style={{backgroundColor: "white"}}>
                    <Content className={classes.content}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </>

    )
}