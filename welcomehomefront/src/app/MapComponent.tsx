"use client";
import * as React from "react";
import Map, { Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapComponent() {
  const [torontoData, setTorontoData] = React.useState(null);

  React.useEffect(() => {
    fetch("/torontoNeighbourhood-brafx6.geojson")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => setTorontoData(data))
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  const torontoFillLayer = {
    id: "toronto-fill-layer",
    type: "fill",
      filter: ['==', 'AREA_NAME', 'Leaside-Bennington'],
    paint: {
      "fill-color": "#bf195a",
      "fill-opacity": 0.6,
      "fill-outline-color": "#000000",
        "fill-emissive-strength": 1,
    },
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -79.3832,
          latitude: 43.6532,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/ezhayne/cm7pv3r9p000k01t2f36v0o4h"
      >
        {/* Only render the Source/Layer after the data has loaded */}
        {torontoData && (
          <Source id="toronto-data" type="geojson" data={torontoData}>
            <Layer {...torontoFillLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
}