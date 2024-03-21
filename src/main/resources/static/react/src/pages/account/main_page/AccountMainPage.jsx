import classes from "./AccountMainPage.module.css"
import React, {useEffect} from 'react';
import {ContactsOutlined, FormOutlined, HistoryOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Layout, Menu} from 'antd';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {client} from "../../../resources/client.js"
import paw from "../../../resources/icons/paw.png"
import paymentIcon from "../../../resources/icons/payment.png"
import {Content} from "antd/es/layout/layout.js";
import Logotype from "../../../components/Logotype.jsx";
import logo from "../../../resources/logo/new_logo.jpeg"
import {useDispatch, useSelector} from "react-redux";
import {setCustomer, setLoading} from "../../../reducers/customerSlice.js";
import {logout} from "../../../reducers/authSlice.js";

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
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const {customer, loading} = useSelector((state) => state.customer);
    const {token, userId} = useSelector((state) => state.auth);

    useEffect(() => {
        if (customer != null) {
            dispatch(setLoading(false));
        }
    }, [customer]);

    useEffect(() => {
        async function fetchClientData() {
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

                const responce = await response.json();

                dispatch(setCustomer(responce.customer));
            } catch (error) {
                console.error('Failed to fetch client data:', error);
            }
        }

        fetchClientData();
    }, []);

    function handleLogout() {
        dispatch(logout());
        navigator("/authentication");
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
                                    {customer.customerInfo.firstName + " " + customer.customerInfo.lastName}
                                </div>
                            </div>
                            <div>
                                    <LogoutOutlined style={{height: "2em", width: "2em", color: "grey"}}
                                                    className={classes.logoutIcon} onClick={handleLogout}/>
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