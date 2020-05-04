import React from 'react';

const TESTING_SITES_URL =
  'https://spreadsheets.google.com/feeds/list/1UluXXXujY87UVSPkcsY4slStZH6HojlBLZSAcR4iqQY/1/public/full?alt=json';

function formatEntries(entry: any) {
  return {
    name: entry?.gsx$areaname?.$t,
    url: entry?.gsx$url?.$t,
  };
}

type Status = 'init' | 'loading' | 'done' | 'error';

type Entry = {
  name: string;
  url?: string;
};

type Entries = Entry[] | [];

export default function usePublicTestingSitesData(): [Status, Entries] {
  const [status, setStatus] = React.useState<Status>('init');
  const [data, setData] = React.useState<Entries>([]);

  async function fetchData() {
    setStatus('loading');

    try {
      const res = await fetch(TESTING_SITES_URL);
      const json = await res.json();

      const mappedData = json.feed.entry.map(formatEntries);

      setData(mappedData);
      setStatus('done');
    } catch (e) {
      setStatus('error');
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return [status, data];
}
