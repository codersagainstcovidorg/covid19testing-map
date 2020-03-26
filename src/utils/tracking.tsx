import ReactGA from 'react-ga';

export const trackLinkClicked = (locationId: string): void =>
  ReactGA.event({
    category: 'Location',
    action: 'View',
    label: locationId,
  });

export const trackEvent = (eventData: any): void => ReactGA.event(eventData);
