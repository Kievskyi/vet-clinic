import Header from "../components/Header.jsx";
import InfoMainPage from "../components/main/InfoMainPage.jsx";
import {Outlet} from "react-router-dom";

export default function Root() {

    return (
        <>
            <Header/>
            <InfoMainPage/>
            <div>
                <Outlet/>
            </div>
        </>
    )
}