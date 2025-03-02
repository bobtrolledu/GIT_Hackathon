"use client";
import * as React from "react";
import Map, { Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapComponentProps {
  areaName: string;
}

export default function MapComponent({ areaName }: MapComponentProps) {
  const [torontoData, setTorontoData] = React.useState<any>(null);
  // Store the feature currently under the pointer
  const [hoveredFeature, setHoveredFeature] = React.useState<any>(null);

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
    filter: ["==", "AREA_NAME", areaName],
    slot: "bottom",
    paint: {
      "fill-color": "#bf195a",
      "fill-opacity": 0.6,
      "fill-outline-color": "#000000",
      "fill-emissive-strength": 1,
    },
  };

  const torontoHoverLayer = {
    id: "toronto-hover-layer",
    type: "fill",
    filter: ["==", "AREA_NAME", ""],
    slot: "bottom",
    paint: {
      "fill-color": "#bf195a",
      "fill-opacity": 1,
      "fill-outline-color": "#000000",
      "fill-emissive-strength": 1,
    },
  };


  const handleMouseMove = (event: any) => {
    const feature = event.features && event.features[0];
    if (feature) {
      setHoveredFeature(feature);
    } else {
      setHoveredFeature(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredFeature(null);
  };

  const hoverFilter = hoveredFeature
    ? ["==", "AREA_NAME", hoveredFeature.properties.AREA_NAME]
    : ["==", "AREA_NAME", ""];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -79.3832,
          latitude: 43.6532,
          zoom: 11,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/ezhayne/cm7pv3r9p000k01t2f36v0o4h"
        // Tell Mapbox which layer(s) should be interactive:
        interactiveLayerIds={["toronto-fill-layer"]}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {torontoData && (
          <Source id="toronto-data" type="geojson" data={torontoData}>
            <Layer {...torontoFillLayer} />

            <Layer {...torontoHoverLayer} filter={hoverFilter} />
          </Source>
        )}
      </Map>
    </div>
  );
}