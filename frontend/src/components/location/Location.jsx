import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Location = () => {
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 }); // Default to London
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLoaded(true);
        },
        (err) => {
          console.error('Error fetching location:', err);
          setError(err.message);
          setLoaded(true); // Allow map to render with default location
        }
      );
    } else {
      const msg = 'Geolocation is not supported by this browser.';
      console.error(msg);
      setError(msg);
      setLoaded(true); // Allow map to render with default location
    }
  }, []);

  return (
    <div className="flex flex-col mx-auto rounded-xl overflow-auto shadow-md bg-white p-6 lg:p-5 w-full font-body">
      <div className="text-base lg:text-sm font-semibold mb-6">
        <h2>My Current Location</h2>
      </div>
      <div className="mb-5">
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : loaded ? (
          <p>
            Latitude: {location.lat}, Longitude: {location.lng}
          </p>
        ) : (
          'Fetching coordinates...'
        )}
      </div>
      <div>
        {loaded ? (
          <MapContainer
            center={location}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={location}>
              <Popup>
                You are here! <br />
                Latitude: {location.lat}, Longitude: {location.lng}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default Location;
