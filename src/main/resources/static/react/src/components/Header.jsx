import logo from "../resources/logo/logo.jpg";
import {Link} from "react-router-dom";

export default function Header() {

    return (
        <header>
            <div className="header-container">
                <nav>

                        <div className="header_menu">
                            <Link to={`/`}> <img className="header_logo" src={logo} alt="Photo not available"/></Link>
                            <Link to={`about`}><span>About </span></Link>
                            <Link to={`doctors`}><span>Doctors</span></Link>
                            <Link to={`services`}><span>Our Services</span></Link>
                            <Link to={`contacts`}><span>Contacts</span></Link>
                        </div>

                </nav>
                {/*Посмотреть почему стили перетираються у кнопок когда див в первом NavLink и потом отрефакторить*/}
                <nav>
                        <div className="header_sign_buttons">
                            <Link to={`registration`}>
                                <button type="button" className="sign_up_button">Sign up</button>
                            </Link>
                            <Link to={`authentication`}>
                                <button type="button" className="sign_in_button">Sign In</button>
                            </Link>
                        </div>
                </nav>
            </div>
        </header>
    )
}