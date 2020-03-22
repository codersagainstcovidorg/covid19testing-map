import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Modal, CardHeader, Link, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Divider } from '@material-ui/core';

import { labelMap } from '../App'

import InfoIcon from '@material-ui/icons/Info';
import LanguageIcon from '@material-ui/icons/Language';
import CloseIcon from '@material-ui/icons/Close';
import ReactGA from "react-ga";

interface ModalProps {
    location: any;
    onClose: Function;
}

export const LocationModal = ({ location, onClose }: ModalProps) => {
    const handleLinkClicked = (locationId: string, action: string): void => {
        ReactGA.event({
            category: 'Location',
            action: action,
            label: locationId,
        });
    };

    let items: any = [
        {
            'title': 'Type',
            'key': 'location-place-of-service-type',
            'icon': <InfoIcon />
        },
        {
            'title': 'Website',
            'key': 'location-contact-url-main',
            'icon': <LanguageIcon />
        },
        {
            'title': 'Testing Criteria',
            'key': 'location-specific-testing-criteria',
            'icon': <LanguageIcon />
        }
    ];

    let details: any = [];
    Object.keys(labelMap).forEach((key: string) => {
        details.push({
            'type': 'boolean',
            'title': labelMap[key].card,
            'key': key,
            'icon': <InfoIcon />
        });
    });

    return (
        <Modal
            style={{ width: '90%', height: '95%', overflow: 'auto', maxWidth: 600, padding: 10, margin: '0 auto', outline: 0 }}
            onClose={() => onClose()}
            disableAutoFocus={true} open
        >
            <Card style={{ outline: 0 }}>
                <CardHeader
                    title={location['location-name']}
                    subheader={
                        location['location-address-street'].trim() + ', '
                        + location['location-address-locality'].trim()
                        + ', ' + location['location-address-region'].trim()
                        + ' ' + location['location-address-postal-code'].trim()
                    }
                    action={
                        <IconButton aria-label="close"
                            onClick={() => onClose()}>
                            <CloseIcon />
                        </IconButton>
                    }
                />

                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        {location['additional-information-for-patients']}
                    </Typography>

                    <List dense={true} style={{ paddingBottom: 0, marginBottom: 0, fontSize: 12 }}>
                        {items.map((item: any, idx: number) => {
                            if (location[item.key].length === 0) {
                                return '';
                            }

                            return (
                                <ListItem key={idx}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {item.icon}
                                        </Avatar>
                                    </ListItemAvatar>

                                    {location[item.key].substr(0, 4) === 'http'
                                        ? <ListItemText style={{ wordWrap: 'break-word', textOverflow: 'ellipsis' }}
                                            primary={<Link onClick={() => {
                                                handleLinkClicked(location['location_id'], "Website Click")
                                            }} href={location[item.key]}>{location[item.key]}</Link>} />
                                        : <ListItemText primary={item.title} secondary={location[item.key]} />}
                                </ListItem>
                            )
                        })}
                    </List>

                    <Divider style={{ margin: 10 }} />

                    <Typography variant="h6">Details about this location</Typography>
                    <List>
                        {details.map((item: any, idx: number) => {
                            const content = location[item.key] === 'TRUE' ? '✅' : '🔴';
                            return (
                                <ListItem key={idx}>
                                    <ListItemText primary={content + ' ' + item.title} />
                                </ListItem>
                            )
                        })}
                    </List>

                </CardContent>

                {location['location-contact-phone-main'] === '' ? '' : (
                    <CardActions>
                        <Button size="small">
                            <Link onClick={() => {
                                handleLinkClicked(location['location_id'], "Call")
                            }} href={'tel://' + location['location-contact-phone-main']}>
                                Call Main Line ({location['location-contact-phone-main']})
                            </Link>
                        </Button>
                    </CardActions>
                )}

                {location['location-contact-phone-appointments'] === '' ? '' : (
                    <CardActions>
                        <Button size="small" >
                            <Link onClick={() => {
                                handleLinkClicked(location['location_id'], "Call")
                            }} href={'tel://' + location['location-contact-phone-appointments']}>
                                Call Appointments Line ({location['location-contact-phone-appointments']})
                            </Link>
                        </Button>
                    </CardActions>
                )}

                <Divider style={{ margin: 10 }} />

                <Typography paragraph={true} style={{ padding: 10 }}>
                    At this point in time, appointments for COVID-19 screening and testing are required at virtually every location - make sure to call or book ahead
                </Typography>

                <CardActions>
                    <Button size="small">
                        <Link onClick={() => {
                            handleLinkClicked(location['location_id'], "Report Error")
                        }} href="https://docs.google.com/forms/d/e/1FAIpQLSfYpEDiV8MwkBSVa7rKI_OzrmtGvclzgFzvcjxocLJncJOXDQ/viewform?usp=sf_link">
                            Report An Error
                        </Link>
                    </Button>

                    <Button size="small">
                        <Link onClick={() => {
                            handleLinkClicked(location['location_id'], "Suggest Edit")
                        }} href="https://docs.google.com/forms/d/e/1FAIpQLScK-lqYZAr6MdeN1aafCrcXKR0cc96Ym-mzwz-4h3OgTpAvyQ/viewform?usp=sf_link">
                            Suggest An Edit
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
};