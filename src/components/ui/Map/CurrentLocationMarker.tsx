import React from 'react'

import { Marker } from '@react-google-maps/api'

import { MarkerProps } from '../../../types/Map/Market'



const CurrentLocationMarker: React.FC<MarkerProps> = ({ position }) => {
    return (
        <Marker position={position} icon={{ url: '/Marker.svg' }} />
    )
}

export default CurrentLocationMarker