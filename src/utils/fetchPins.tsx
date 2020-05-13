import SearchFilterType from '../Components/Types/SearchFilterType';

const { REACT_APP_API_ENDPOINT } = process.env;

const fetchPins = async (searchFilters: SearchFilterType) => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/api/v1/location?fields=location_id,location_name,location_address_locality,location_address_region,location_latitude,location_longitude,location_status,raw_data,updated_on`;
  const results: Response = await fetch(endpoint);
  const data = await results.json();

  return (data as any).filter((place: any) => {
    const keys = Object.keys(searchFilters);
    let ret: boolean = true;

    for (let i = 0; i < keys.length; i++) {
      const filter: keyof SearchFilterType = keys[i] as keyof SearchFilterType;
      if (searchFilters[filter] && place[filter] !== true) {
        ret = false;
      }
    }

    return ret;
  });
};

export default fetchPins;
