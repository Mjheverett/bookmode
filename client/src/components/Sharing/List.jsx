import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, GridList, GridListTile, CardContent } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: '#52781e',
  },
  card: {
    width: 'auto',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: fade(theme.palette.common.white, 0.15),
    color: '#002B36',
    textAlign: 'left',
  },
  commentsMobile: {
    display: 'inlineBlock',
    width: '100%',   
  },  
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  }, 
}));

const BigList = (props) => {
  const classes = useStyles();
  const { sent, received } = props;

  //Grabbing screen width on load. Pulling into comments classes.
  const lWidth = window.screen.width;
  console.log("screen width is",lWidth);
  
  return (
    <>
      <GridList  className={lWidth > 575 ? classes.gridList : classes.commentsMobile} cols={lWidth > 575 ? 2 : 1} cellHeight={'auto'} >
        {!!sent ? (sent.map(prop=>(
        <GridListTile cellHeight={'auto'}>
          <br />
          <Card className={classes.card} >
              <CardHeader
                  avatar={
                  <Avatar className={classes.avatar}>
                      {prop.receiver.name[0]}
                  </Avatar>
                  }
                  title={prop.receiver.name}
                  subheader={moment(prop.createdAt).format('MMMM Do YYYY, h:mm a')}
              />
              <CardContent>
                  <Typography variant="h6" style={{color: '#002B36'}}>{prop.Book.title}</Typography>
                  <Typography style={{color: '#002B36'}}>{prop.comment}</Typography>
              </CardContent>
          </Card>
          <br />
          </GridListTile>
        ))): (received.map(prop=>(
        <GridListTile cellHeight={'auto'}>
          <br />
          <Card className={classes.card} >
              <CardHeader
                  avatar={
                  <Avatar className={classes.avatar}>
                      {prop.sender.name[0]}
                  </Avatar>
                  }
                  title={prop.sender.name}
                  subheader={moment(prop.createdAt).format('MMMM Do YYYY, h:mm a')}
              />
              <CardContent>
                  <Typography variant="h6" style={{color: '#002B36'}}>{prop.Book.title}</Typography>
                  <Typography style={{color: '#002B36'}}>{prop.comment}</Typography>
              </CardContent>
          </Card>
          <br />
        </GridListTile>
        )))}
      </GridList>
    </>
  );
}
export default BigList;