import React from 'react'
import { GoogleMap } from '@react-google-maps/api'


import CurrentLocationMarker from './CurrentLocationMarker'
import { defaultTheme } from './Theme'

import { MapProps } from '../../../types/Map/Map'

import styles from '../styles/Map.module.scss'


const Map: React.FC<MapProps> = ({ center }) => {
    const screenWidth = window.screen.width
    const containerStyle = {
        width: `${screenWidth > 414 ? "400px" : "370px"}`,
        height: "220px",
    };

    const defaultOptions = {
        panControl: true,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        clickablesIcons: false,
        keyboardShortcuts: false,
        scrollwheel: true,
        disableDoubleClockZoom: true,
        fullscreenControl: false,
        zoom: 9,
        styles: defaultTheme
    }
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={defaultOptions}
        >
            <CurrentLocationMarker
                position={center}
            />
        </GoogleMap >
    )
}

export default Map

