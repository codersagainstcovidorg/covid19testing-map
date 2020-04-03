const { REACT_APP_API_ENDPOINT } = process.env;

const fetchPins = async () => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/api/v1/location`;
  const results: Response = await fetch(endpoint);
  const data = await results.json();

  return data;
};

export default fetchPins;
