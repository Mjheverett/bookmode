import React, { useState} from 'react';
import axios from 'axios';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import { useAuth0 } from '@auth0/auth0-react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutline from '@material-ui/icons/Delete';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import { IconButton, MenuItem, Menu, Modal, Chip, Input, InputLabel, Select, TextField, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    borderRadius: '4px',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    alignContent: 'center'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  recommendDetails: {
    color: '#52781e',
    margin: '0, auto',
  }
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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


const CustomizedMenus = (props) => {
  const {shelves, users, book, groups} = props
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const theme = useTheme();
  const [groupName, setGroupName] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [content, setContent] = useState(null);
  const { user } = useAuth0();
  
  

  const handleChangeName = (event) => {
    setPersonName(event.target.value);
  };
  const handleChangeGroup = (event) => {
    setGroupName(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  // const handleChangeMultiple = (event) => {
  //   const { options } = event.target;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setPersonName(value);
  // };

  const handleClick = (bookId, shelfId) => {
    console.log("bookId: ",bookId, "shelf id: ", shelfId);
  axios.post(`http://localhost:3000/library/${shelfId}/${bookId}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  //modal functions
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateRec= (e) => {
    e.preventDefault();
    setOpen(false);
    const data = {

        receiverName: personName[0] || groupName[0],
        bookId: book.id,
        content: content,
        senderId: user.sub,
        isGroup: !!groupName ? true : false

    };
    axios.post(`http://localhost:3000/recommendations/add`, data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
  }

//modal template to render 
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6">Who would you like to recommend <strong style={{color: '#52781e'}}>{book.title}</strong> to?</Typography>
      <br />
      <form onSubmit={e => handleCreateRec(e)}>
        <InputLabel id="demo-mutiple-chip-label">Send to individual(s)</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChangeName}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {users.map((user) => (
            <MenuItem key={user.name} value={user.name} style={getStyles(user.name, personName, theme)}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <br />
        <InputLabel id="demo-mutiple-chip-label">Send group(s)</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={groupName}
          onChange={handleChangeGroup}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {groups.map((group) => (
            <MenuItem key={group.groupName} value={group.groupName} style={getStyles(group.groupName, personName, theme)}>
              {group.groupName}
            </MenuItem>
          ))}
        </Select>
        <TextField
          onChange={handleChangeContent}
          value={content}
          label="Add a comment?"
          id="standard-start-adornment"
          fullWidth
          className={clsx(classes.margin, classes.textField)}
        />
        <br />
        <br />
      <Button type="submit" color="secondary" variant="contained" size="large">Send your recommendation</Button>
      </form>
    </div>
  );

//menu functions
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleDeleteBook = () => {
    axios.delete(`http://localhost:3000/results/${book.id}/${book.shelves_books.ShelfId}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  axios.post(`http://localhost:3000/library/${book.shelves_books.ShelfId}/${book.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  
  }
    
  const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);}
    const menuId = book;
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
          {(shelves.length !== 0) ? (shelves.map(shelf => (
          <div>
          <MenuItem 
            key={shelf.id}
            onClick={() => handleClick(book.id, shelf.id)}>
            {shelf.shelfName}
          </MenuItem>
          </div>
          ))) : (<MenuItem>No shelves!</MenuItem>)}
        </Menu>
    );

  const mobileMenuId = 'primary-search-account-menu-mobile'

  return (    
    <div>
      <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color='#002B36'
      >
        <MoreVertIcon fontSize="large"/>
      </IconButton>
      <StyledMenu className={classes.recommendDetails}
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
      >
          <MenuItem onClick={handleOpenModal} className={classes.recommendDetails}>
            <ListItemIcon style={{color: '#52781e'}}
            color="secondary">
              <SendIcon fontSize="small" />
            </ListItemIcon>
              <ListItemText primary="Send recommendation" />
          </MenuItem>
            <MenuItem className={classes.recommendDetails} onClick={_handleDeleteBook}>
                <ListItemIcon
                color="secondary">
                  <DeleteOutline style={{color: '#52781e'}} fontSize="small" />
                </ListItemIcon>
                <ListItemText style={{color: '#52781e'}} primary="Remove book from this shelf">
                </ListItemText> 
            </MenuItem>
            <MenuItem className={classes.recommendDetails} onClick={handleProfileMenuOpen} aria-controls={menuId} aria-haspopup="true" color="secondary">
                <IconButton
                    aria-label="account of current user"
                    color="secondary"
                    style={{paddingLeft: '0'}}
                >
                    <CollectionsBookmarkIcon />
                </IconButton>
                <ListItemText style={{paddingLeft: '18px'}} primary="Sort book into a different shelf" />
            </MenuItem>
        </StyledMenu>
            {renderMenu}
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
    );
}
export default CustomizedMenus;
