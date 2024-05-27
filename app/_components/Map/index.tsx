import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { MapContainer, TileLayer } from 'react-leaflet'
import { useState, useEffect } from "react"
import { LatLngExpression } from "leaflet"

import Typography from "@mui/material/Typography"
import { Loading } from "../Loading"

const Map = () => {
    const [position, setPosition] = useState<LatLngExpression | undefined>()
    const [permissionDenied, setPermissionDenied] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition([position.coords.latitude, position.coords.longitude])
            },
            (err) => setPermissionDenied(err.message === 'User denied Geolocation'),
            { timeout: 5000, enableHighAccuracy: true }
        )
    }, [])

    if (permissionDenied) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Typography sx={{ fontWeight: 'bold' }} className="text-black">Para carregar o mapa você precisa autorizar o acesso a localização.</Typography>
            </div>
        )
    }

    return (
        position
            ? (
                <MapContainer center={position} zoom={13} className="w-full h-full" >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            )
            : <Loading />
    )
}

export default Map