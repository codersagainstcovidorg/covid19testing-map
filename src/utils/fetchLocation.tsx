const { REACT_APP_API_ENDPOINT } = process.env;

const fetchLocation = async (location_id: string) => {
    const results: Response = await fetch(`${REACT_APP_API_ENDPOINT}/api/v1/location/${location_id}`);
    return await results.json();
};

export default fetchLocation;