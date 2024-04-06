import classes from "./AccountMainPage.module.css"
import React, {useEffect} from 'react';
import {LogoutOutlined} from '@ant-design/icons';
import {Avatar, Layout, Menu} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";
import {client} from "../../../resources/client.js"
import {customerMenuItems} from "../../../resources/menu/customerMenu.jsx";
import {doctorMenuItems} from "../../../resources/menu/doctorMenu.jsx";
import {administratorMenuItems} from "../../../resources/menu/administratorMenu.jsx";
import {Content} from "antd/es/layout/layout.js";
import Logotype from "../../../components/Logotype.jsx";
import logo from "../../../resources/logo/new_logo.jpeg"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../reducers/authSlice.js";
import {selectUserDataByRole} from "../../../selectors/selectUserByRole.js";
import {setAdministrator, setCustomer, setDoctor, setLoading, setRole} from "../../../reducers/userSlice.js";
import Loading from "../../../components/Loading.jsx";

const {Header, Sider} = Layout;

export default function AccountMainPage() {
    const isLoading = useSelector((state) => state.user.loading);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUserDataByRole);
    const {token, userId} = useSelector((state) => state.auth);

    useEffect(() => {
        async function fetchUserData() {
            dispatch(setLoading(true));
            try {
                const url = `/api/account/showPersonalInfo?userId=${userId}`;
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                handleUserDispatch(result);
            } catch (error) {
                console.error('Failed to fetch client data:', error);
            } finally {
                dispatch(setLoading(false));
            }
        }

        fetchUserData();
    }, []);

    function handleUserDispatch(user) {
        dispatch(setRole(user.role));
        if (user?.role === "CUSTOMER") {
            dispatch(setCustomer(user.customer));
        } else if (user?.role === "DOCTOR") {
            dispatch(setDoctor(user.doctor));
        } else if (user?.role === "ADMINISTRATOR") {
            dispatch(setAdministrator(user.administrator));
        }
    }

    function handleUserMenuItems() {
        if (user?.role === "CUSTOMER") {
            return customerMenuItems;
        } else if (user?.role === "DOCTOR") {
            return doctorMenuItems;
        } else if (user?.role === "ADMINISTRATOR") {
            return administratorMenuItems;
        }
    }

    function handleLogout() {
        dispatch(logout());
        navigator("/authentication");
    }

    if (isLoading) {
        return (
            <>
                <Loading/>
            </>
        )
    }

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
                                    {user?.userInfo.firstName + " " + user?.userInfo.lastName}
                                </div>
                            </div>
                            <div>
                                <LogoutOutlined style={{height: "2em", width: "2em", color: "grey"}}
                                                className={classes.logoutIcon} onClick={handleLogout}/>
                            </div>
                        </div>
                    </div>
                    <div className={classes.logoHeaderAccountContainer}>
                        <Logotype path="/account/info" image={logo} className={classes.logoHeaderAccount}/>
                    </div>
                </Header>
            </Layout>
            <Layout className={classes.layoutSiderAndContent}>
                <Sider
                    theme="light"
                    className={classes.sider}>
                    <Menu className={classes.menu} theme="light" mode="inline"
                          items={handleUserMenuItems()}/>
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