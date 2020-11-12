import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: '#52781e',
},
}));

const BigList = (props) => {
  const classes = useStyles();
  const { sent, received } = props
  
  return (
      <>
    {!!sent ? (sent.map(prop=>(
    <List className={classes.root}>
    <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar className={classes.avatar}>
        {prop.receiver.name[0]}
            </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={prop.Book.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {prop.receiver.name}
              </Typography>
              <br />
              {prop.comment}
              <br />
              <Typography
                component="span"
                variant="overline"
                className={classes.inline}
                color="textPrimary"
              >
                {moment(prop.createdAt).format('MMMM Do YYYY, h:mm a')}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
    ))): (received.map(prop=>(
        <List className={classes.root}>
    <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar className={classes.avatar}>
        {prop.sender.name}
            </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={prop.Book.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {prop.sender.name}
              </Typography>
              <br />
              {prop.comment}
              <br />
              <Typography
                component="span"
                variant="overline"
                className={classes.inline}
                color="textPrimary"
              >
                {moment(prop.createdAt).format('MMMM Do YYYY, h:mm a')}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
    ))
    ) }
    
    </>
  );
}
export default BigList;