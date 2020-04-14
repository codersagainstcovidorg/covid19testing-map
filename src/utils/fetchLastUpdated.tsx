const { REACT_APP_API_ENDPOINT } = process.env;

const fetchLastUpdated = async (): Promise<string> => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/api/v1/recentLocation`;
  const response: Response = await fetch(endpoint);
  const lastUpdatedString: string = await response.json();
  
  const convert = (aDateString: string): string => {
    const aDate: Date = new Date(aDateString);
    
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric"}).format(aDate)
    + " at " +
    new Intl.DateTimeFormat("en-US", {hour: 'numeric', minute: 'numeric', timeZoneName: 'short'}).format(aDate);
  }
  
  return convert(lastUpdatedString);
};

export default fetchLastUpdated;
