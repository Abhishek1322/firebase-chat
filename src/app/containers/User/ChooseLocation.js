import React, { useCallback, useState, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import { GOOLE_MAPS_API_KEY } from "../../../config/config";
import * as Images from "../../../utilities/images";
import { getCurrentLocation } from "../../../redux/slices/user";
import { useDispatch } from "react-redux";

const libraries = ["places"];

const mapContainerStyle = {
  height: "96vh",
  width: "94vw",
  margin: "0 auto",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: true,
};

const center = {
  lat: 20.745,
  lng: 78.523,
};

const ChooseLocation = () => {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOLE_MAPS_API_KEY,
    libraries,
  });

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      // ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    dispatch(
      getCurrentLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      })
    );
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng, position, address }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setMarkers((current) => [
      // ...current,
      {
        lat,
        lng,
        time: new Date(),
      },
    ]);
    dispatch(
      getCurrentLocation({
        lat: lat,
        lng: lng,
      })
    );
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="map-outer-section">
      <div className="search-current">
        <Locate panTo={panTo} />
        <Search panTo={panTo} />
      </div>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `${Images.locationIcon}`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>{" "}
                Alert
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

function Locate({ panTo }) {
  return (
    <button
      className="locate current-locate-btn"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude,
              position: position,
            });
          },

          () => null
        );
      }}
    >
      <img src={Images.targetLocation} alt="target-location" />
      current location
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng, address });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search search-location-input">
      <Combobox className="search-location-box" onSelect={handleSelect}>
        <ComboboxInput
          className="search-location-input"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <img
          className="locate-icon-map"
          alt="locate-icon"
          src={Images.smallLocate}
        />
        <img
          className="search-icon-map"
          alt="search-icon"
          src={Images.smallSearch}
        />
        <ComboboxPopover className="location-list-box">
          <ComboboxList className="location-list-items">
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption
                  className="locate-options"
                  key={id}
                  value={description}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default ChooseLocation;
