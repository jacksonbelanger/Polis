import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import districtsData from "./districts.json";
import districtsSF from "./districts_sf.json"

mapboxgl.accessToken = 'pk.eyJ1IjoieWFudHNlbnRlciIsImEiOiJjbG5wYzY4b2wwYTJmMmlvMTBqYjkyY2VoIn0.95vb98mxkUb4pzEpO_rF0Q';

console.log(districtsSF)
console.log(districtsData)

const Map = () => {
    const mapContainerRef = useRef(null);

    // Initial states for Atlanta
    const [lng, setLng] = useState(-84.4);
    const [lat, setLat] = useState(33.77);
    const [zoom, setZoom] = useState(10.5);

    // State to toggle between Atlanta and San Francisco
    const [isAtlanta, setIsAtlanta] = useState(true);

    // Function to toggle location
    const toggleLocation = () => {
        setIsAtlanta(!isAtlanta);
    };

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            // maxBounds: [
            //     [-84.4 - 0.63, 33.8 - 0.5], // Southwest coordinates
            //     [-84.4 + 0.5, 33.8 + 0.55] // Northeast coordinates
            //     ]
        })

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('load', () => {
            // Colors array for differentiation, add more if required
            const colors = ['blue', 'red', 'green', 'yellow', '#fa5aef', 'purple', 'black', '#05fc70', '#e07809', '#07deed', 'gray', '#82f202'];

            // Iteratively add district layers for ATL
            districtsData.features.forEach((feature, index) => {
              let districtCoords = feature.geometry.coordinates;

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

              map.on('click', `district${index}`, (e) => {
                if (e.features.length) {
    
                    const councilMember=districtsData.features[index].properties.Council_Member
                    const districtname=districtsData.features[index].properties.Dist_Name
                    const area=districtsData.features[index].properties.SQMILES
                    const photo=districtsData.features[index].properties.Photo
                    // Create content for the popup based on clicked feature properties
                    const content = `
                        <h3><strong>District ${districtname}</strong></h3>
                        <p><strong>Council Member:</strong> ${councilMember}</p>
                        <p><strong>Area (in acres):</strong> ${area}</p>
                        <img src="${photo}" alt="Council Member Photo" width="100" />
                    `;
    
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(content)
                        .addTo(map);
                }
                });

            });
            

            // Iteratively add district layers for SF
            districtsSF.forEach((district, index) => {
                let districtCoords = district.geometry.coordinates[0][0]
                
              // exceptions for district 6 bc bad formatting
              if (district.properties.sup_dist==="6") {
                districtCoords = district.geometry.coordinates[1][0];
              }

                map.addLayer({
                    id: `sfdistrict${index}`,
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [districtCoords]
                            }
                        }
                    },
                    paint: {
                        'fill-color': colors[index % colors.length],  // Use modulo for safety
                        'fill-opacity': 0.4
                    }
                });
  
                map.on('click', `sfdistrict${index}`, (e) => {
                  if (districtsSF.length) {
      
                      const councilMember=district.properties.sup_name
                      const districtname=district.properties.sup_dist_name
                      // Create content for the popup based on clicked feature properties
                      const content = `
                          <h3><strong>District: </strong>${districtname}</h3>
                          <p><strong>Council Member:</strong> ${councilMember}</p>
                      `;
      
                      new mapboxgl.Popup()
                          .setLngLat(e.lngLat)
                          .setHTML(content)
                          .addTo(map);
                  }
                });
  
            });  

        });

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // Function to update map center
        const updateMapCenter = () => {
            const newCenter = isAtlanta ? [-84.4, 33.77] : [-122.4194, 37.7749];
            const newZoom = isAtlanta ? 10.5 : 11;
            map.flyTo({ center: newCenter, zoom: newZoom });
        };

        // Call this function when isAtlanta changes
        updateMapCenter();

        return () => map.remove();
    }, [isAtlanta]);

    return (
        <div>
            <div className='sidebarStyle'>
                <div className='button-container'>
                    <button onClick={toggleLocation}>
                        {isAtlanta ? "Switch to San Francisco" : "Switch to Atlanta"}
                    </button>
                </div>
                {/* <div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div> */}
            </div>
            <div className='map-container' ref={mapContainerRef} />
        </div>
    );
};

export default Map;