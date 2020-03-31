import { SearchFilters } from '../App';

const getFilteredPins = (searchFilters: SearchFilters) => {
  return fetch('https://api.findcovidtesting.com/api/v1/location')
    .then((results: any) => results.json())
    .then((data: any) => {
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
    });
};

export default getFilteredPins;
