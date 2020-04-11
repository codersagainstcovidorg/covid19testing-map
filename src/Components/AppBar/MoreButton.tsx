import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import ShareIcon from '@material-ui/icons/Share';
import GitHubIcon from '@material-ui/icons/GitHub';
import CodeIcon from '@material-ui/icons/Code';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { API_URL, GITHUB_URL } from '../../constants';
import { trackUiClick } from '../../utils/tracking';

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

  const handleOpen = React.useCallback((event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
    trackUiClick('More Menu', 'Open');
  }, []);

  const closeMenu = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClose = React.useCallback(() => {
    closeMenu();
    trackUiClick('More Menu', 'close');
  }, [closeMenu]);

  const handleMenuItemClick = React.useCallback(
    (title: string) => () => {
      closeMenu();
      trackUiClick(title);
    },
    [closeMenu]
  );

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu open={open} anchorEl={anchorEl} keepMounted onClose={handleClose}>
        {actions.map(({ Icon, title, href }) => (
          <MenuItem
            onClick={handleMenuItemClick(title)}
            component="a"
            href={href}
            key={title}
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
