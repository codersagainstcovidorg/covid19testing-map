import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';

import {
  locateByGeoIp,
  locateByBrowserGeo,
  LocateCallback,
} from '../utils/locateUser';
import usePublicTestingSitesData from '../utils/usePublicTestingSitesData';

type Props = {
  onClose?: Function;
};

type Coords = {
  lat: number;
  lon: number;
} | null;

export default function RedirectModal(props: Props) {
  const { onClose } = props;
  const [open, setOpen] = React.useState<boolean>(true);
  const [testingSitesStatus, testingSitesData] = usePublicTestingSitesData();
  // const [userLocation, setUserLocation] = React.useState<Coords>(null);
  const inputRef = React.useRef<HTMLInputElement>();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClose = () => {
    setOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleOnLocateUser: LocateCallback = React.useCallback(
    (geoLocation) => {
      if (geoLocation && typeof inputRef.current !== 'undefined') {
        // inputRef.current.value = `${geoLocation.latitude}, ${geoLocation.longitude}`;
      }
    },
    []
  );

  React.useEffect(() => {
    locateByGeoIp((geoLocation) => {
      handleOnLocateUser(geoLocation);
      locateByBrowserGeo(handleOnLocateUser);
    });
  }, [handleOnLocateUser]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Get to the right place</DialogTitle>

      <DialogContent style={{ overflow: 'hidden' }}>
        <DialogContentText>
          In order to show you the most relevant information, please confirm or
          update the information below. This website is developed in partnership
          with public health departments from across the country. If the box is
          empty, you may need to click &ldquo;Allow&rdquo; when prompted by your
          browser.
        </DialogContentText>
        <Autocomplete
          id="places"
          freeSolo={false}
          options={testingSitesData}
          loading={testingSitesStatus === 'loading'}
          disabled={testingSitesStatus !== 'done'}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              id="place"
              variant="outlined"
              size="medium"
              color="secondary"
              inputRef={inputRef}
              label="You can search by typing into the box."
              helperText="ex: '94025', 'Menlo Park', 'San Mateo County', 'California'"
              type="search"
            />
          )}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>

        <Button onClick={handleClose} color="primary">
          Go
        </Button>
      </DialogActions>
    </Dialog>
  );
}
