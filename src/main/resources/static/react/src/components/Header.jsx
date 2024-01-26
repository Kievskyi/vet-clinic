import logo from "../resources/logo/logo.jpg";

export default function Header() {

    return (
        <header className="header">
            <div className="header_menu">
                <a href="#">
                    <img className="header_logo" src={logo} alt="Photo not available"/>
                </a>
                <a href="#">
                    <span>About </span>
                </a>
                <a href="#">
                    <span>Doctors</span>
                </a>
                <a href="#">
                    <span>Prices</span>
                </a>
                <a href="#">
                    <span>Contacts</span>
                </a>
            </div>

            <div className="header_sign_buttons">
                <button type="button" className="sign_up_button">Sign up</button>
                <button type="button" className="sign_in_button">Sign In</button>
            </div>
        </header>
    )
}