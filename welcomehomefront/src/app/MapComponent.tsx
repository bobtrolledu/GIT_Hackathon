"use client"
import * as React from 'react';
import Map, { Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapComponent() {
    return (
        <div>
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={{
                    longitude: -79.3832,
                    latitude: 43.6532,
                    zoom: 12
                }}
                style={{ width: "100vw", height: "100vh" }}
                mapStyle="mapbox://styles/ezhayne/cm7pv3r9p000k01t2f36v0o4h"
            >
            </Map>
        </div>
    );
}