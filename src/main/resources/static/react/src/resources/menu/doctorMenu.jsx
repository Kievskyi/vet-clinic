import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";
import React from "react";

export const doctorMenuItems = [
    {
        name: <Link to={"info"}>My information</Link>,
        icon: () => <Link to={"info"}><UserOutlined/></Link>,
    },
    {
        name: <Link to={"my-appointments"}>My appointments</Link>,
        icon: () => <Link to={"my-appointments"}><UserOutlined/></Link>,
    },
].map(
    (item, index) => ({
        key: String(index + 1),
        icon: typeof item.icon === 'function' ? item.icon() : React.createElement(item.icon),
        label: item.name,
    }),
);