import PLACES from "../data/data.json";
import { SearchFilters } from "../App";

export const getFilteredPins = (searchFilters: SearchFilters) => {
  return (PLACES as any).filter((place: any) => {
    if (searchFilters["is-verified"] && place["is-verified"] !== "TRUE") {
      return false;
    }

    if (
      searchFilters["is-location-collecting-specimens"] &&
      place["is-location-collecting-specimens"] !== "TRUE"
    ) {
      return false;
    }

    if (
      searchFilters["is-location-by-appointment-only"] &&
      place["is-location-by-appointment-only"] !== "TRUE"
    ) {
      return false;
    }

    if (
      searchFilters["is-location-only-testing-patients-that-meet-criteria"] &&
      place["is-location-only-testing-patients-that-meet-criteria"] !== "TRUE"
    ) {
      return false;
    }

    return true;
  });
};
