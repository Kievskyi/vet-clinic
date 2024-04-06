import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";
import React from "react";

export const administratorMenuItems = [
    {
        name: <Link to={"info"}>My information</Link>,
        icon: () => <Link to={"info"}><UserOutlined/></Link>,
    },
    {
        name: <Link to={"new-doctor"}>Add new doctor</Link>,
        icon: () => <Link to={"new-doctor"}><UserOutlined/></Link>,
    },
    {
        name: <Link to={"statistics"}>Statistics</Link>,
        icon: () => <Link to={"statistics"}><UserOutlined/></Link>,
    },
].map(
    (item, index) => ({
        key: String(index + 1),
        icon: typeof item.icon === 'function' ? item.icon() : React.createElement(item.icon),
        label: item.name,
    }),
);