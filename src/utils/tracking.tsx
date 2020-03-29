import ReactGA from 'react-ga';

export const trackLinkClicked = (locationId: string): void =>
  ReactGA.event({
    category: 'Location',
    action: 'View',
    label: locationId,
  });

export const trackLocationPrompt = (label: string): void => {
  ReactGA.event({
    category: 'Location Prompt',
    action: 'GeoIP',
    label,
  });
};

export const trackDrawerStatus = (action: boolean): void => {
  ReactGA.event({
    category: 'Drawer',
    action: action ? 'Close' : 'Open',
  });
};

export const trackEvent = (eventData: any): void => ReactGA.event(eventData);
