import {Link} from "react-router-dom";
import {ContactsOutlined, FormOutlined, HistoryOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import paw from "../icons/paw.png";
import paymentIcon from "../icons/payment.png";

const PawIcon = ({alt = " ", ...props}) => (
    <img src={paw} alt={alt} {...props} />
);

const PaymentIcon = ({alt = " ", ...props}) => (
    <img src={paymentIcon} alt={alt} {...props} />
);

export const customerMenuItems = [
    {
        name: <Link to={"info"}>My information</Link>,
        icon: () => <Link to={"info"}><UserOutlined/></Link>,
    },
    {
        name: <Link to={"my-pets"}>My pets</Link>,
        icon: () => <Link to={"my-pets"}><PawIcon alt={"Unable to load a picture"} style={{width: 15, height: 15}}/></Link>,
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
        icon: () => <Link to={"feedback"}><FormOutlined/></Link>
    },
    {
        name: <Link to={"payment"}>Payment</Link>,
        icon: () => <Link to={"payment"}><PaymentIcon alt={"Unable to load a picture"} style={{width: 15, height: 15}}/></Link>
    }
].map(
    (item, index) => ({
        key: String(index + 1),
        icon: typeof item.icon === 'function' ? item.icon() : React.createElement(item.icon),
        label: item.name,
    }),
);