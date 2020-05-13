const { REACT_APP_API_ENDPOINT } = process.env;

const fetchLocation = async (location_id: string) => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/api/v1/location/`;
  const results: Response = await fetch(`${endpoint}${location_id}`);
  const data = await results.json();
  
  return data
};

export default fetchLocation;