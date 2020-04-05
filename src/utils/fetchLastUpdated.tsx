const { REACT_APP_API_ENDPOINT } = process.env;

const fetchLastUpdated = async (): Promise<string> => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/api/v1/recentLocation`;
  const response: Response = await fetch(endpoint);
  const lastUpdated: string = await response.json();

  return lastUpdated;
};

export default fetchLastUpdated;
