import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import FullScreenImage from './FullScreenImage';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CameraIcon from '@material-ui/icons/PhotoCameraOutlined';
import SunIcon from '@material-ui/icons/WbSunny';
import RoverIcon from '@material-ui/icons/AirportShuttle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 3}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  info:{
    display: 'flex',
    alignItems: 'center',
  }
});

const AnnoyingDialog = (function (props){
  const { open, handleClose } = props;

  useEffect(() => {
    console.log('component renderd')
  });

  return(  
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to remove this image?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleClose(true)} color="primary" autoFocus>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
    )
})


function Album(props) {
  const { classes } = props;
  const controller = new AbortController();
  const signal = controller.signal;

  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [state, updateState] = useState({
    photos: [],
    fullScreenImageIndex: -1,
    
  })
  
  const setState = (newState) => {
    
    console.log(`key: ${Object.keys(newState)[0]}, value: ${newState[Object.keys(newState)[0]]}`);

    updateState({...state, ...newState})
  }

  useEffect(() => {
    fetch('https://shielded-woodland-10835.herokuapp.com/gallery-saves', {
      method: 'GET',
      signal: signal,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-auth-token': sessionStorage.getItem('rover-view-token')
      }
    })
    .then((res) => {
      if(!res.ok){
        console.log('error loading gallery');
      }
      return res.json();
    })
    .then((res) => {
      
      updateState(
          {
            ...state,
            photos: res.map((photo) => {
            let img = new Image();
            img.src = photo.img_src;
            return {
              imageObjectRef: img,
              ...photo}
            })
          }
        )
    })
    .catch(e => console.log('error: ' + e)); 


    return function cleanup() {
      controller.abort();
    }
  },[]);

  const handleViewButtonClick = (fullScreenImageIndex) => {
    console.log('handleviewbuttonclick() called');
    updateState({
      ...state, 
      fullScreenImageIndex
    });
  }

  const handleClose = (confirmed) =>{
    setDialogOpen(false);
    if(confirmed){
      removeImage(state.removeIndex);
    }
  }

  const handleRemoveButtonClick = (index) =>{
    setState({removeIndex: index});
    setDialogOpen(true);
  }

  const removeImage = (removeIndex) => {
    fetch('https://shielded-woodland-10835.herokuapp.com/gallery-saves', {
      method: 'DELETE',
      signal: signal,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-auth-token': sessionStorage.getItem('rover-view-token')
      },
      body: JSON.stringify({ removeIndex })
    })
    .then((res) => {
      if(!res.ok){
        console.log('error loading gallery');
      }
      return res.json();
    })
    .then((res) => {
      
      const newPhotos = state.photos;
      newPhotos.splice(removeIndex, 1);
      updateState({
        ...state,
        photos: newPhotos
      });
    })
    .catch(e => console.log('error: ' + e)); 



    
  }

  const { photos, fullScreenImageIndex } = state;

  return (
    <React.Fragment>
      <CssBaseline/>
      {fullScreenImageIndex !== -1 && <FullScreenImage handleClose={() => updateState({...state, fullScreenImageIndex: -1})} photo={photos[fullScreenImageIndex]}/>}
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Gallery
            </Typography>
            
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {photos.map((photo, index) => (
              <Grid item key={photo.img_src} xs={6} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={photo.img_src} 
                    title={`image id: ${photo.id}`}
                  />
                  <CardContent className={classes.cardContent}>
                    
                    <Typography gutterBottom color="textSecondary" className={classes.info}>
                      <RoverIcon fontSize="small"/>
                       &nbsp;{photo.rover.name}
                    </Typography>
                    <Typography gutterBottom color="textSecondary" className={classes.info}>
                      <CameraIcon fontSize="small"/>
                       &nbsp;{photo.camera.full_name}
                    </Typography>
                    <Typography gutterBottom color="textSecondary" className={classes.info}>
                      <SunIcon fontSize="small"/>
                       &nbsp;{photo.sol}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleViewButtonClick(index)}>
                      View
                    </Button>
                    
                    <Button size="small" color="primary" onClick={() => handleRemoveButtonClick(index)}>
                      Remove
                    </Button>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <AnnoyingDialog open={dialogOpen} handleClose={handleClose}/>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
       
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);