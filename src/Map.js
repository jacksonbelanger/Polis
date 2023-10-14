import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import districtsData from "./districts.json";

mapboxgl.accessToken =
  'pk.eyJ1IjoieWFudHNlbnRlciIsImEiOiJjbG5wYzY4b2wwYTJmMmlvMTBqYjkyY2VoIn0.95vb98mxkUb4pzEpO_rF0Q';

// ... (your existing imports)
const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      const district0 = districtsData.features[0].geometry.coordinates[0];

      map.addLayer({
        id: 'district0',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district0]
            }
          }
        },
        paint: {
          'fill-color': 'blue',
          'fill-opacity': 0.4
        }
      });

      const district1 = districtsData.features[1].geometry.coordinates[0];

      map.addLayer({
        id: 'district1',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district1]
            }
          }
        },
        paint: {
          'fill-color': 'red',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });

      const district2 = districtsData.features[2].geometry.coordinates[0];

      map.addLayer({
        id: 'district2',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district2]
            }
          }
        },
        paint: {
          'fill-color': 'green',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });

      const district3 = districtsData.features[3].geometry.coordinates[0];

      map.addLayer({
        id: 'district3',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district3]
            }
          }
        },
        paint: {
          'fill-color': 'yellow',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });

      const district4 = districtsData.features[4].geometry.coordinates[0];

      map.addLayer({
        id: 'district4',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district4]
            }
          }
        },
        paint: {
          'fill-color': 'pink',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });

      const district5 = districtsData.features[5].geometry.coordinates[0];

      map.addLayer({
        id: 'district5',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district5]
            }
          }
        },
        paint: {
          'fill-color': 'purple',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });

      const district6 = districtsData.features[6].geometry.coordinates[0];

      map.addLayer({
        id: 'district6',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district6]
            }
          }
        },
        paint: {
          'fill-color': 'black',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });

      const district7 = districtsData.features[7].geometry.coordinates[0];

      map.addLayer({
        id: 'district7',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district7]
            }
          }
        },
        paint: {
          'fill-color': 'gray',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });

      const district8 = districtsData.features[8].geometry.coordinates[0][0];
      console.log(districtsData)
      map.addLayer({
        id: 'district8',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district8]
            }
          }
        },
        paint: {
          'fill-color': 'yellow',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });

      const district9 = districtsData.features[9].geometry.coordinates[0];

      map.addLayer({
        id: 'district9',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district9]
            }
          }
        },
        paint: {
          'fill-color': '#4287f5',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });
      
      const district10 = districtsData.features[10].geometry.coordinates[0];

      map.addLayer({
        id: 'district10',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district10]
            }
          }
        },
        paint: {
          'fill-color': '#eb4034',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      });

      const district11 = districtsData.features[11].geometry.coordinates[0][0];
      map.addLayer({
        id: 'district11',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [district11]
            }
          }
        },
        paint: {
          'fill-color': 'yellow',  // A different color for differentiation
          'fill-opacity': 0.4
        }
      })
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