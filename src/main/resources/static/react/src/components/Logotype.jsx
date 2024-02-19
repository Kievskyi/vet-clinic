import {Link} from "react-router-dom";

export default function Logotype({path, image, className}) {

    return (
        <Link to={`${path}`}><img className={className} src={image} alt="Image not available"/></Link>
    )
}