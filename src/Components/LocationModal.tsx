import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  CardHeader,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Theme,
  createStyles,
  BottomNavigationAction,
  BottomNavigation,
} from '@material-ui/core';

import InfoIcon from '@material-ui/icons/Info';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIcon from '@material-ui/icons/Phone';
import DirectionsIcon from '@material-ui/icons/Directions';
import ShareIcon from '@material-ui/icons/Share';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ReactGA from 'react-ga';
import { indigo, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { labelMap } from '../App';

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
  },
  bottomNavigation: {
    '&.Mui-selected': {
      color: indigo[800],
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  callToAction: {
    width: '100%',
    height: '60px',
    fontSize: '20px',
    color: theme.palette.getContrastText(indigo[800]),
    backgroundColor: indigo[800],
    '&:hover': {
      backgroundColor: indigo[900],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: indigo[800],
      },
    },
  },
}));


interface ModalProps {
  location: any;
  onClose: Function;
}

const LocationModal = ({ location, onClose }: ModalProps) => {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleLinkClicked = (locationId: string, action: string): void => {
    ReactGA.event({
      category: 'Location',
      action,
      label: locationId,
    });
  };

  const items: any = [
    {
      title: 'Type',
      key: 'location_place_of_service_type',
      icon: <InfoIcon />,
    },
    {
      title: 'Website',
      key: 'location_contact_url_main',
      icon: <LanguageIcon />,
    },
    {
      title: 'Testing Criteria',
      key: 'location_specific_testing_criteria',
      icon: <LanguageIcon />,
    },
  ];

  const details: any = [];
  Object.keys(labelMap)
    .filter((key: string) => key !== 'is_verified')
    .forEach((key: string) => {
      details.push({
        type: 'boolean',
        title: labelMap[key].card,
        key,
        icon: <InfoIcon />,
      });
    });

  return (
    <Modal
      className={classes.modal}
      onClose={() => onClose()}
      disableAutoFocus
      open
    >
      <Card className={classes.card}>
        <CardHeader
          title={location.location_name}
          subheader={
                        `${location.location_address_street.trim()}, ${
                          location.location_address_locality.trim()
                        }, ${location.location_address_region.trim()
                        } ${location.location_address_postal_code.trim()}`
                    }
          action={(
            <div>
              <IconButton area-label="call">
                <PhoneIcon />
              </IconButton>
              <IconButton area-label="directions">
                <DirectionsIcon />
              </IconButton>
              <IconButton area-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton area-label="report">
                <ReportProblemIcon />
              </IconButton>

            </div>
                      )}
        />

        <CardContent>
          <Button variant="contained" size="large" className={classes.callToAction}>
            Learn More
          </Button>
          {/*          <Typography color="textPrimary" gutterBottom> */}
          {/*            {location.additional_information_for_patients} */}
          {/*          </Typography> */}

          {/*          <List dense style={{ paddingBottom: 0, marginBottom: 0, fontSize: 12 }}> */}
          {/*            {items.map((item: any) => { */}
          {/*              if (location[item.key].length === 0) { */}
          {/*                return ''; */}
          {/*              } */}

          {/*              return ( */}
          {/*                <ListItem key={item.key}> */}
          {/*                  <ListItemAvatar> */}
          {/*                    <Avatar> */}
          {/*                      {item.icon} */}
          {/*                    </Avatar> */}
          {/*                  </ListItemAvatar> */}

          {/*                  {location[item.key].substr(0, 4) === 'http' */}
          {/*                    ? ( */}
          {/*                      <ListItemText */}
          {/*                        style={{ wordWrap: 'break-word', textOverflow: 'ellipsis' }} */}
          {/*                        primary={( */}
          {/*                          <Link */}
          {/*                            onClick={() => { */}
          {/*                              handleLinkClicked(location.location_id, 'Website Click'); */}
          {/*                            }} */}
          {/*                            href={location[item.key]} */}
          {/*                          > */}
          {/*                            {location[item.key]} */}
          {/*                          </Link> */}
          {/* )} */}
          {/*                      /> */}
          {/*                    ) */}
          {/*                    : <ListItemText primary={item.title} secondary={location[item.key]} />} */}
          {/*                </ListItem> */}
          {/*              ); */}
          {/*            })} */}
          {/*          </List> */}

          {/*          <Divider style={{ margin: 10 }} /> */}

          {/*          <Typography variant="h6">Details about this location</Typography> */}
          {/*          <List> */}
          {/*            {details.map((item: any) => { */}
          {/*              const content = location[item.key] === 'TRUE' ? '✅' : '🔴'; */}
          {/*              return ( */}
          {/*                <ListItem key={item.key}> */}
          {/*                  <ListItemText primary={`${content} ${item.title}`} /> */}
          {/*                </ListItem> */}
          {/*              ); */}
          {/*            })} */}
          {/*          </List> */}

        </CardContent>

        <Divider />
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction className={classes.bottomNavigation} label="Detail" icon={<InfoIcon />} />
          <BottomNavigationAction className={classes.bottomNavigation} label="Criteria" icon={<ListAltIcon />} />
          <BottomNavigationAction className={classes.bottomNavigation} label="Feedback" icon={<FeedbackIcon />} />
        </BottomNavigation>

        {/* {location.location_contact_phone_main === '' ? '' : ( */}
        {/*  <CardActions> */}
        {/*    <Button size="small"> */}
        {/*      <Link */}
        {/*        onClick={() => { */}
        {/*          handleLinkClicked(location.location_id, 'Call'); */}
        {/*        }} */}
        {/*        href={`tel://${location.location_contact_phone_main}`} */}
        {/*      > */}
        {/*        Call Main Line ( */}
        {/*        {location.location_contact_phone_main} */}
        {/*        ) */}
        {/*      </Link> */}
        {/*    </Button> */}
        {/*  </CardActions> */}
        {/* )} */}

        {/* {location.location_contact_phone_appointments === '' ? '' : ( */}
        {/*  <CardActions> */}
        {/*    <Button size="small"> */}
        {/*      <Link */}
        {/*        onClick={() => { */}
        {/*          handleLinkClicked(location.location_id, 'Call'); */}
        {/*        }} */}
        {/*        href={`tel://${location.location_contact_phone_appointments}`} */}
        {/*      > */}
        {/*        Call Appointments Line ( */}
        {/*        {location.location_contact_phone_appointments} */}
        {/*        ) */}
        {/*      </Link> */}
        {/*    </Button> */}
        {/*  </CardActions> */}
        {/* )} */}

        {/* <Divider style={{ margin: 10 }} /> */}

        {/* <Typography paragraph style={{ padding: 10 }}> */}
        {/*  At this point in time, appointments for COVID-19 screening and testing are required */}
        {/*  at virtually every location - make sure to call or book ahead */}
        {/* </Typography> */}

        {/* <CardActions> */}
        {/*  <Button size="small"> */}
        {/*    <Link */}
        {/*      onClick={() => { */}
        {/*        handleLinkClicked(location.location_id, 'Report Error'); */}
        {/*      }} */}
        {/*      href="https://docs.google.com/forms/d/e/1FAIpQLSfYpEDiV8MwkBSVa7rKI_OzrmtGvclzgFzvcjxocLJncJOXDQ/viewform?usp=sf_link" */}
        {/*    > */}
        {/*      Report An Error */}
        {/*    </Link> */}
        {/*  </Button> */}

        {/*  <Button size="small"> */}
        {/*    <Link */}
        {/*      onClick={() => { */}
        {/*        handleLinkClicked(location.location_id, 'Suggest Edit'); */}
        {/*      }} */}
        {/*      href="https://docs.google.com/forms/d/e/1FAIpQLScK-lqYZAr6MdeN1aafCrcXKR0cc96Ym-mzwz-4h3OgTpAvyQ/viewform?usp=sf_link" */}
        {/*    > */}
        {/*      Suggest An Edit */}
        {/*    </Link> */}
        {/*  </Button> */}
        {/* </CardActions> */}
      </Card>
    </Modal>
  );
};

export default LocationModal;
