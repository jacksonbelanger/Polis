import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import districtsData from "./districts.json";

mapboxgl.accessToken = 'pk.eyJ1IjoieWFudHNlbnRlciIsImEiOiJjbG5wYzY4b2wwYTJmMmlvMTBqYjkyY2VoIn0.95vb98mxkUb4pzEpO_rF0Q';

console.log(districtsData)

const Map = () => {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(-84.4);
    const [lat, setLat] = useState(33.77);
    const [zoom, setZoom] = useState(11.5);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            maxBounds: [
                [-84.4 - 0.33, 33.8 - 0.2], // Southwest coordinates
                [-84.4 + 0.3, 33.8 + 0.15] // Northeast coordinates
                ]
        })

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('load', () => {
            // Colors array for differentiation, add more if required
            const colors = ['blue', 'red', 'green', 'yellow', '#fa5aef', 'purple', 'black', '#05fc70', '#e07809', '#07deed', 'gray', '#82f202'];

            // Iteratively add district layers
            districtsData.features.forEach((feature, index) => {
              let districtCoords = feature.geometry.coordinates;
          
              // If the data has unnecessary nested lists, flatten it by one level.
              /*
              if (feature.geometry.type === "MultiPolygon" && districtCoords.length === 1) {
                  districtCoords = districtCoords[0];
              }
              */

              // exceptions for index 8 and 11 bc formatting is wack for them
              if (index === 8) {
                districtCoords = districtCoords[1];
              }

              if (index === 11) {
                districtCoords = districtCoords[0];
              }
          
              map.addLayer({
                  id: `district${index}`,
                  type: 'fill',
                  source: {
                      type: 'geojson',
                      data: {
                          type: 'Feature',
                          geometry: {
                              type: 'Polygon',
                              coordinates: [districtCoords[0]] // Ensuring we take the first nested list which contains the coordinates.
                          }
                      }
                  },
                  paint: {
                      'fill-color': colors[index % colors.length],  // Use modulo for safety
                      'fill-opacity': 0.4
                  }
              });
          });          

            // Create popup but don't attach it yet
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('click', (e) => {
                const features = map.queryRenderedFeatures(e.point, {});
                const districtFeatures = features.filter(f => f.layer.id.includes('district'));

                if (districtFeatures.length) {
                    const district = districtFeatures[0];
                    const districtInfo = district.properties;
                    popup.setLngLat(e.lngLat)
                        .setHTML(`<h3>District Info</h3><p>${JSON.stringify(districtInfo)}</p>`)
                        .addTo(map);
                } else {
                    popup.remove();
                }
            });
        });

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        return () => map.remove();
    }, []);

    return (
        <div>
            <div className='sidebarStyle'>
                <div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
            <div className='map-container' ref={mapContainerRef} />
        </div>
    );
};

export default Map;