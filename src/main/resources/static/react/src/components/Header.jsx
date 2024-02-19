import logo from "../resources/logo/new_logo.jpeg";
import {Link} from "react-router-dom";
import Logotype from "./Logotype.jsx";

export default function Header() {

    return (
        <header>
            <div className="header-container">
                <nav>
                    <Logotype path={"/"} image={logo} className={"headerLogo"}/>
                    <div className="header_menu">
                        <Link to={`about`}><span>About </span></Link>
                        <Link to={`doctors`}><span>Doctors</span></Link>
                        <Link to={`services`}><span>Our Services</span></Link>
                        <Link to={`contacts`}><span>Contacts</span></Link>
                    </div>
                </nav>
                <nav>
                    <div className="header_sign_buttons">
                        <Link to={`authentication`}>
                            <button className="cta">
                                <div className="user-icon"></div>
                                <svg width="15px" height="10px" viewBox="0 0 13 10">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}