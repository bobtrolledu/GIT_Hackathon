

export default const torontoFillLayer = {
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