import React, { Dispatch, SetStateAction } from "react";

const MapSelectAddress = ({
  data,
  keyValue,
  nameValue,
  setState,
  classname,
  required,
  setValue,
}: {
  id: string;
  data: any;
  keyValue: string;
  nameValue: string;
  classname?: string;
  required?: boolean;
  setState: Dispatch<SetStateAction<google.maps.LatLngLiteral>>;
  setValue?: Dispatch<SetStateAction<string>>;
}) => {
  const geocoder = new google.maps.Geocoder();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Get the id of the choosen item value
    const selectedAddress = data?.find(
      (item: any) => item?.address === e.target.value,
    );

    if (setValue) {
      setValue(selectedAddress?.id);
    }

    geocodeAddress(e.target.value);
  };

  const geocodeAddress = (address: string) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0].geometry.location) {
        const newMarkerPosition = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        setState(newMarkerPosition);
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status,
        );
      }
    });
  };

  return (
    <section className={classname}>
      <select
        id="id"
        onChange={handleSelectChange}
        defaultValue=""
        className="form-controls"
        required={required}
      >
        <option value="" disabled>
          Select an address
        </option>
        {data?.map((address: any) => (
          <option key={address[keyValue]} value={address[nameValue]}>
            {address[nameValue]}
          </option>
        ))}
      </select>
    </section>
  );
};

export default MapSelectAddress;
