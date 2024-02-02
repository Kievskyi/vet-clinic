import Header from "../components/Header.jsx";
import {Outlet} from "react-router-dom";
import "../styles/index.css"
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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