import SearchFilterType from '../Components/Types/SearchFilterType';
import { defaultCenter } from '../Components/Map/Map';

const { REACT_APP_API_ENDPOINT } = process.env;

const fetchPins = async (
  searchFilters?: SearchFilterType,
  source_latitude: number = defaultCenter.latitude,
  source_longitude: number = defaultCenter.longitude,
  distance: number = 3000,
  ) => {
    const endpoint = `${REACT_APP_API_ENDPOINT}/api/v1/location?limit=40000&source_latitude=${source_latitude}&source_longitude=${source_longitude}&distance=${distance}&fields=location_id,location_name,location_address_locality,location_address_region,location_latitude,location_longitude,location_status`;
    const results: Response = await fetch(endpoint);
    const data = await results.json();
    const keys = Object.keys(searchFilters ?? {});
    
    // No need to run through filter if no filters exist
    if (keys.length > 0) {
      return (data as any).filter((place: any) => {
        let ret: boolean = true;

        for (let i = 0; i < keys.length; i++) {
          const filter: keyof SearchFilterType = keys[i] as keyof SearchFilterType;
          if (searchFilters![filter] && place[filter] !== true) {
            ret = false;
          }
        }
        return ret;
      });
    }
    else {
      return (data as any);
    }
};

export default fetchPins;
