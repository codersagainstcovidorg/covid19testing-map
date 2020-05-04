import { GEOLOCATION_URL } from '../constants';

export type LocateCallback = (location?: {
  latitude: number;
  longitude: number;
}) => any;

export async function locateByGeoIp(callback: LocateCallback) {
  try {
    const response = await fetch(GEOLOCATION_URL);
    const data = await response.json();

    if (data.status === 'success') {
      const { lat, lon } = data;
      callback({ latitude: lat, longitude: lon });
    }
  } catch (e) {
    console.error('failed to get location from geoIp', e);
    callback();
  }
}

export function locateByBrowserGeo(callback: LocateCallback) {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      const { latitude, longitude } = res.coords;
      callback({ latitude, longitude });
    },
    (e: any) => {
      console.error('failed to get location from browser', e);
      callback();
    },
    {
      enableHighAccuracy: true,
      timeout: 2000,
    }
  );
}
