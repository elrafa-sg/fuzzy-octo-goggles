import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { MapContainer, TileLayer } from 'react-leaflet'
import { useState, useEffect } from "react"
import { LatLngExpression } from "leaflet"

const Map = () => {
    const [position, setPosition] = useState<LatLngExpression | undefined>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition([position.coords.latitude, position.coords.longitude])
            })
    }, [])

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
            : <span className="text-yellow-400 text-2xl text-center">carregando mapa...</span>
    )
}

export default Map