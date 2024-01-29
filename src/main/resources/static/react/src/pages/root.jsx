import Header from "../components/Header.jsx";
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