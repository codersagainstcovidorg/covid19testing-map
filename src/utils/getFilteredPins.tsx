import PLACES from "../data/data.json";
import { SearchFilters } from "../App";

export const getFilteredPins = (searchFilters: SearchFilters) => {
  return (PLACES as any).filter((place: any) => {
    const keys = Object.keys(searchFilters);
    let ret: boolean = true;

    for (let i = 0; i < keys.length; i++) {
      let filter: keyof SearchFilters = keys[i] as keyof SearchFilters;
      if (searchFilters[filter] && place[filter] !== 'TRUE') {
        ret = false;
      }
    }

    return ret;
  });
};
