import { SearchFilters } from '../App';

const { REACT_APP_API_ENDPOINT } = process.env;

const fetchPins = async (searchFilters: SearchFilters) => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/api/v1/location`;
  const results: Response = await fetch(endpoint);
  const data = await results.json();

  return (data as any).filter((place: any) => {
    const keys = Object.keys(searchFilters);
    let ret: boolean = true;

    for (let i = 0; i < keys.length; i++) {
      const filter: keyof SearchFilters = keys[i] as keyof SearchFilters;
      if (searchFilters[filter] && place[filter] !== true) {
        ret = false;
      }
    }

    return ret;
  });
};

export default fetchPins;
