"use client";
import * as React from "react";
import Map, { Source, Layer, LayerProps, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes"
import {useEffect} from "react";

interface MapComponentProps {
    areaName1: string;
    areaName2: string;
    areaName3: string;
}

export default function MapComponent({ areaName1, areaName2, areaName3 }: MapComponentProps) {
    const [torontoData, setTorontoData] = React.useState<any>(null);
    // Store the feature currently under the pointer
    const [hoveredFeature, setHoveredFeature] = React.useState<any>(null);
    const [hoverCoordinates, setHoverCoordinates] = React.useState<{ lng: number; lat: number } | null>(null);
    const [neighbourhoodImg, setNeighbourhoodImg] = React.useState<string | null>(null);
    const [imageCache, setImageCache] = React.useState<Record<string, string>>({});
    const theme = useTheme();
    const [layersLoaded, setLayersLoaded] = React.useState(false);

    useEffect(() => {
        setLayersLoaded(false);
    }, [theme]);

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

    React.useEffect(() => {
      const fetchNeighbourhoodImg = async () => {
        if (hoveredFeature && !imageCache[hoveredFeature.properties.AREA_NAME]) {
          try {
            const response = await fetch("http://localhost:8000/api/getNeighbourhoodImg/", {
              credentials: 'include',
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ query: hoveredFeature.properties.AREA_NAME })
            });
            const data = await response.json();
            setNeighbourhoodImg(data);
            setImageCache((prevCache) => ({
              ...prevCache,
              [hoveredFeature.properties.AREA_NAME]: data,
            }));
          } catch (error) {
            console.error("Error fetching neighbourhood image:", error);
          }
        }
        else if (hoveredFeature) {
          setNeighbourhoodImg(imageCache[hoveredFeature.properties.AREA_NAME]);
        }

      };

      fetchNeighbourhoodImg();
    }, [hoveredFeature, imageCache]);


        const torontoFillLayer: LayerProps = {
            id: "toronto-fill-layer",
            type: "fill",
            filter: ["in", "AREA_NAME", areaName1, areaName2, areaName3],
            slot: "bottom",
            paint: {
                "fill-color": "#5e9fd4",
                "fill-opacity": 0.6,
                "fill-outline-color": "#000000",
                "fill-emissive-strength": 1,
            },
        };

        const torontoHoverLayer: LayerProps = {
            id: "toronto-hover-layer",
            type: "fill",
            filter: ["==", "AREA_NAME", ""],
            slot: "bottom",
            paint: {
                "fill-color": "#5e9fd4",
                "fill-opacity": 1,
                "fill-outline-color": "#000000",
                "fill-emissive-strength": 1,
            },
        };

        const handleMouseMove = (event: any) => {
            const feature = event.features && event.features[0];
            if (feature) {
                setHoveredFeature(feature);
                setHoverCoordinates(event.lngLat);
            } else {
                setHoveredFeature(null);
                setHoverCoordinates(null);
            }
        };

        const handleMouseLeave = () => {
            setHoveredFeature(null);
            setHoverCoordinates(null);
        };

        const hoverFilter = hoveredFeature
            ? ["==", "AREA_NAME", hoveredFeature.properties.AREA_NAME]
            : ["==", "AREA_NAME", ""];

        const onMapLoad = (e: any) => {
            // Once the map has loaded, set the layers
            setLayersLoaded(true);
        };

        return (
            <div className="w-screen h-screen">
                <div className="absolute w-screen h-screen right-0">
                    <Map
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                        initialViewState={{
                            longitude: -79.3832,
                            latitude: 43.6532,
                            zoom: 11,
                            pitch: 45,

                        }}
                        style={{width: "100%", height: "100%"}}
                        mapStyle={theme.theme === 'dark' ? 'mapbox://styles/ezhayne/cm7rosvj3002m01sv4y1mdjzp' : 'mapbox://styles/ezhayne/cm7pv3r9p000k01t2f36v0o4h'}
                        maxZoom={20}
                        minZoom={10.9}

                        interactiveLayerIds={["toronto-fill-layer"]}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onLoad={onMapLoad}
                    >


                        {torontoData && layersLoaded && (
                            <Source id="toronto-data" type="geojson" data={torontoData}>
                                <Layer {...torontoFillLayer} />
                                <Layer {...torontoHoverLayer} filter={hoverFilter}/>
                            </Source>
                        )}
                        {hoveredFeature && hoverCoordinates && (
                            <Popup
                                longitude={hoverCoordinates.lng}
                                latitude={hoverCoordinates.lat}
                                closeButton={false}
                                closeOnClick={false}
                                anchor="bottom"
                                className="py-3 text-foreground"
                            >
                                <div className="relative bg-background transform scale-120 origin-center p-4 rounded-md shadow-lg pointer-events-none">
                                    <div className="space-y-2 bg-background">
                                        <img
                                            className="w-full rounded"
                                            src={neighbourhoodImg || "https://upload.wikimedia.org/wikipedia/commons/a/a8/CC_2022-06-18_193-Pano_%28cropped%29_01.jpg"}
                                            width={382}
                                            height={216}
                                            alt="Content image"
                                        />
                                        <div className="space-y-1">
                                            <p className="text-[13px] font-bold">{hoveredFeature.properties.AREA_NAME}</p>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        )}
                    </Map>
                </div>
            </div>
        )
            ;
    }