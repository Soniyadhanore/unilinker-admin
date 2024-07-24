

import { useEffect, useState } from "react";
import { API_ROUTES } from "../common/Enum";
import globalRequest from "../prototype/globalRequest";
import { getFullAddress } from "../common/HelperFunctions";

export const useGoogleLocation = () => {
  const [addressSuggestion, setAddressSuggestion] = useState([]);
  const [fullAddress, setFullAddress] = useState(null);
  const [latLng, setLatLng] = useState({
    lat: null,
    lng: null,
  });

  //get address list
  const getGoogleAddressSuggestions = async (search) => {
    try {
      const res = await globalRequest(
        API_ROUTES.GOOGLE_ADDRESS_SUGGESTIONS(search),
        "get",
        {},
        {},
        true
      );
      if (res?.status === "SUCCESS") {
        const data = res?.data;
        const suggestions = data?.predictions?.map(
          (prediction) => prediction.description
        );
        if (suggestions?.length > 0) setAddressSuggestion([...suggestions]);
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    }
  };

  //on select address get lat lng
  const getLatLongByAddress = async (address) => {
    try {
      const res = await globalRequest(
        API_ROUTES.GET_LAT_LNG(address),
        "get",
        {},
        {},
        true
      );
      if (res?.status === "SUCCESS") {
        const data = res?.data;
        let lat = data?.results[0]?.geometry?.location?.lat;
        let lng = data?.results[0]?.geometry?.location?.lng;
        setLatLng({
          lat,
          lng,
        });
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    }
  };

  //using lat lng get selected address data
  const getFullAddressUsingLatLng = async (lat, lng) => {
    try {
      const res = await globalRequest(
        API_ROUTES.GET_FULL_ADDRESS_USING_LAT_LNG(lat, lng),
        "get",
        {},
        {},
        true
      );
      if (res?.status === "SUCCESS") {
        const result = getFullAddress(res?.data);
        setFullAddress(result);
      }
    } catch (err) {
      console.error("error", err?.response?.data);
    }
  };

  useEffect(() => {
    if (latLng?.lat && latLng?.lng) {
      getFullAddressUsingLatLng(latLng?.lat, latLng?.lng);
    }
  }, [latLng]);

  return {
    getGoogleAddressSuggestions,
    getLatLongByAddress,
    setAddressSuggestion,
    addressSuggestion,
    setFullAddress,
    fullAddress,
    latLng,
  };
};