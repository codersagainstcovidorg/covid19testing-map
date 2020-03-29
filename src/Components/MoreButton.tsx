import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import ShareIcon from '@material-ui/icons/Share';
import GitHubIcon from '@material-ui/icons/GitHub';
import CodeIcon from '@material-ui/icons/Code';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { API_URL, GITHUB_URL } from '../constants';

const actions = [
  /* { Icon: ShareIcon, title: 'Share', href: '' }, */
  { Icon: GitHubIcon, title: 'Code', href: GITHUB_URL },
  { Icon: CodeIcon, title: 'API', href: API_URL },
];

const MenuText = styled.span`
  margin-left: 20px;
`;

const MoreButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const open = React.useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu open={open} anchorEl={anchorEl} keepMounted onClose={handleClose}>
        {actions.map(({ Icon, title, href }) => (
          <MenuItem
            onClick={handleClose}
            component="a"
            href={href}
            target="_blank"
            rel="noopener"
          >
            <Icon />
            <MenuText>{title}</MenuText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MoreButton;
