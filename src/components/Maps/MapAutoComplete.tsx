import { Autocomplete } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const MapAutoComplete = ({
  setState,
  id,
  placeholder,
  className,
  required,
  setGetData,
  value,
}: {
  id: string;
  value?: string;
  placeholder: string;
  className?: string;
  required?: boolean;
  setState: Dispatch<SetStateAction<google.maps.LatLngLiteral>>;
  setGetData?: Dispatch<SetStateAction<any>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoadSearchBox = (ref: google.maps.places.Autocomplete) => {
    if (!inputRef) return;

    const options = ["formatted_address", "geometry"];

    ref.setFields(options);

    setPlaceAutocomplete(ref);
  };

  const onPlacesChanged = () => {
    if (!placeAutocomplete) return;

    const place = placeAutocomplete.getPlace();
    if (setGetData) {
      setGetData((prev: any) => ({ ...prev, [id]: place }));
    }

    if (place.geometry && place.geometry.location) {
      const newMarkerPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setState(newMarkerPosition);
    }
  };

  return (
    <section className={className}>
      <Autocomplete onLoad={onLoadSearchBox} onPlaceChanged={onPlacesChanged}>
        <input
          ref={inputRef}
          type="text"
          id={id}
          placeholder={placeholder}
          className="form-control"
          defaultValue={value}
          required={required}
        />
      </Autocomplete>
    </section>
  );
};

export default MapAutoComplete;
