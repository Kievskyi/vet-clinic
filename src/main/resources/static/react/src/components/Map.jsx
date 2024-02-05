import classes from "../pages/contacts/Contacts.module.css"
import "leaflet/dist/leaflet.css";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";


export default function Map() {
    const position = [50.450, 30.524]

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={classes.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Dmytrivska 1
                </Popup>
            </Marker>
        </MapContainer>
    )
}