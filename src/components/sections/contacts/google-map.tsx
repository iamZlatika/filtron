"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "400px" };
const storeLocation = { lat: 47.811298, lng: 35.180385 };

export default function InteractiveStoreMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY as string,
  });

  if (!isLoaded) return <p>Загрузка карты…</p>;

  const handleMarkerClick = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${storeLocation.lat},${storeLocation.lng}`,
      "_blank",
    );
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={storeLocation}
      zoom={15}
      options={{
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      <Marker position={storeLocation} onClick={handleMarkerClick} />
    </GoogleMap>
  );
}
