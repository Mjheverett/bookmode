import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: 'transparent',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#52781e',
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
    <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="large"/>
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" style={{color: '#52781e'}}/>
          </ListItemIcon>
          <ListItemText primary="Send recommendation" style={{color: '#93A1A1'}}/>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <MenuBookIcon fontSize="small" style={{color: '#52781e'}}/>
          </ListItemIcon>
          <ListItemText primary="See book details" style={{color: '#93A1A1'}}/>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <CollectionsBookmarkIcon fontSize="small" style={{color: '#52781e'}}/>
          </ListItemIcon>
          <ListItemText primary="Sort book into a different shelf" style={{color: '#93A1A1'}}/>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}