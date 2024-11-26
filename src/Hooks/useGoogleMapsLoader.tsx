import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

const useGoogleMapsLoader = (apiKey: string) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  // State to manage the singleton loading status
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setMapLoaded(true);
    }
  }, [isLoaded]);

  return { mapLoaded };
};

export default useGoogleMapsLoader;
