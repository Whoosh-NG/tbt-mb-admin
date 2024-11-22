import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";

import React, { FC, useEffect, useState } from "react";

// const apiKey = 'AIzaSyAbwCWIXvLE11eZb7xhAu9YBzobJHbqt5I';
// const Libraries = 'places';

const containerStyle = {
  width: "100%",
  height: "300px",
};

interface RenderGoogleMapProps {
  startLatLng?: google.maps.LatLngLiteral;
  endLatLng?: google.maps.LatLngLiteral;
  markerPosition?: { lat: number; lng: number };
}

const RenderGoogleMap: FC<RenderGoogleMapProps> = ({
  markerPosition,
  startLatLng,
  endLatLng,
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    const getDirection = async () => {
      const res = await directionsService.route({
        origin: startLatLng as google.maps.LatLngLiteral,
        destination: endLatLng as google.maps.LatLngLiteral,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirections(res);
      // console.log(res);
      // console.log('duration>>>', res?.routes[0]?.legs[0].distance?.text);
      // console.log('duration>>', res?.routes[0]?.legs[0].duration?.text);
      // (result, status) => {
      //   if (status === google.maps.DirectionsStatus.OK) {
      //     setDirections(result);
      //   } else {
      //     console.error(`Directions request failed due to ${status}`);
      //   }
      // },
    };

    getDirection();
  }, [startLatLng, endLatLng]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition || startLatLng}
      zoom={10}
      // onLoad={onLoad}
      // options={{
      //   zoomControl: false,
      //   streetViewControl: false,
      //   mapTypeControl: false,
      //   fullscreenControl: false,
      // }}
    >
      {markerPosition && <Marker position={markerPosition} />}
      {startLatLng && <Marker position={startLatLng} />}
      {endLatLng && <Marker position={endLatLng} />}

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default RenderGoogleMap;
