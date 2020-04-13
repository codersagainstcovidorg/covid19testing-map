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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faHeadSideMask,
  faTasks,
  faVial,
} from '@fortawesome/free-solid-svg-icons';
import { labelMap } from '../App';
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

interface DoctorStepProps {
  onResponseClick: Function;
}

const DoctorCard = ({ onResponseClick }: DoctorStepProps) => {
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
    trackUiClick('DoctorCard', value ? 'yes' : 'no');
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
          Which of the following best describes you?
        </Typography>
        <List component="nav">
          <ListItem
            button
            onClick={() => {
              handleResponseClick(false);
            }}
          >
            <ListItemIcon>
              <span className="fa-layers fa-fw fa-2x" style={{ width: '100%' }}>
                <FontAwesomeIcon icon={faCircle} color="lightgray" />
                <FontAwesomeIcon
                  icon={faTasks}
                  transform="shrink-7"
                  color="white"
                />
              </span>
            </ListItemIcon>
            <ListItemText
              primary="I may have symptoms, but I'm unsure"
              secondary="Check your symptoms using the CDC's online self-assessment tool"
            />
          </ListItem>
          <ListItem button>
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
          </ListItem>
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
          </ListItem>
        </List>
      </CardContent>
    </div>
  );
};

export default DoctorCard;
