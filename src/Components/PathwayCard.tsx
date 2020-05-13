import React from 'react';
import {
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AssistantIcon from '@material-ui/icons/Assistant';
import { Icon, Stack } from '@mdi/react';
import { 
  mdiCircle,
  mdiFormatListChecks,
  mdiDoctor,
} from '@mdi/js';
import { labelMap } from '../App';
// import { statusToColor, MarkerIconProps } from '../Components/Map/MapPins';
import { trackUiClick } from '../utils/tracking';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      maxWidth: '90%',
      width: '600px',
      maxHeight: '90%',
      overflowY: 'auto',
    },
    responseButton: {
      textTransform: 'none',
      width: '50%',
      marginBottom: '10px',
    },
    cardMargin: {
      marginBottom: '16px',
    },
    detailsButton: {
      paddingLeft: '8px',
    },
    cardActions: {
      cursor: 'pointer',
    },
    title: {
      fontWeight: 'bold',
    },
  })
);

interface PathwayStepProps {
  onResponseClick: Function;
}

const PathwayCard = ({ onResponseClick }: PathwayStepProps) => {
  const classes = useStyles();
  const details: any = [];
  Object.keys(labelMap).forEach((key: string) => {
    details.push({
      type: 'boolean',
      title: labelMap[key].card,
      key,
      icon: labelMap[key].icon,
    });
  });

  const handleResponseClick = (value: boolean) => {
    trackUiClick('Pathway', value ? 'yes' : 'no');
    onResponseClick(value);
  };

  return (
    <div>
      <CardHeader
        avatar={<AssistantIcon color="primary" />}
        title="Personalize"
        classes={{ title: classes.title }}
        titleTypographyProps={{ variant: 'h5' }}
      />
      <Divider />

      <CardContent>
        <Typography
          color="textPrimary"
          variant="h6"
          style={{ fontWeight: 'bold' }}
          className={classes.cardMargin}
        >
          Step-by-step guide
        </Typography>
        <Typography style={{ fontStyle: 'italic', color: 'gray' }}>
          Select from the following options:
        </Typography>
        <List component="nav">
          <ListItem button onClick={() => {
              handleResponseClick(false);
            }}>
            <ListItemIcon>
              <span style={{ width: '100%' }}>
                <Stack>
                  <Icon path={mdiCircle}
                    size={0.8}
                    rotate={0}
                    color="#540d6e"
                    />
                  <Icon path={mdiFormatListChecks}
                    title="May have symptoms"
                    size={0.55}
                    rotate={0}
                    color="#fff"
                    />
                </Stack>
              </span>
            </ListItemIcon>
            <ListItemText
              primary="I may have symptoms, but I'm unsure"
              secondary="Check your symptoms using the CDC's online self-assessment tool"
            />
          </ListItem>
          <ListItem button onClick={() => {
              handleResponseClick(false);
            }}>
            <ListItemIcon>
              <span style={{ width: '100%' }}>
                <Stack>
                  <Icon path={mdiCircle}
                    size={0.8}
                    rotate={0}
                    color={ "#fa7921" }
                    />
                  <Icon path={mdiDoctor}
                    title="High priority"
                    size={0.55}
                    rotate={0}
                    color="#fff"
                    />
                </Stack>
              </span>
            </ListItemIcon>
            <ListItemText
              primary="I work in healthcare"
              secondary="For symptomatic healthcare workers/first responders only"
            />
          </ListItem>
          {/* <ListItem button>
            <ListItemIcon>
              <span className="fa-layers fa-fw fa-2x" style={{ width: '100%' }}>
                <FontAwesomeIcon icon={faCircle} color="lightgray" />
                <FontAwesomeIcon
                  icon={faHeadSideMask}
                  transform="shrink-7"
                  color="white"
                />
              </span>
            </ListItemIcon>
            <ListItemText
              primary="I meet CDC criteria for high-risk individuals"
              secondary="Find testing locations serving healthcare providers, first responders and essential workers"
            />
          </ListItem> */}
          {/* 
          <ListItem button>
            <ListItemIcon>
              <span className="fa-layers fa-fw fa-2x" style={{ width: '100%' }}>
                <FontAwesomeIcon icon={faCircle} color="lightgray" />
                <FontAwesomeIcon
                  icon={faVial}
                  transform="shrink-7"
                  color="white"
                />
              </span>
            </ListItemIcon>
            <ListItemText
              primary="I meet CDC criteria for community testing"
              secondary="Find locations serving all members of your community"
            />
          </ListItem> */}
        </List>
      </CardContent>
    </div>
  );
};

export default PathwayCard;
