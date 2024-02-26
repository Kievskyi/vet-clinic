import Header from "../components/Header_main_page/Header.jsx";
import {Outlet} from "react-router-dom";
import "../styles/index.css"

export default function Root() {

    return (
        <>
            <Header/>
            <div>
                <Outlet/>
            </div>
        </>
    )
}