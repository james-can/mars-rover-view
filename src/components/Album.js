import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';

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



function Album(props) {
  const { classes } = props;
  const controller = new AbortController();
  const signal = controller.signal;

  const [ photos, setPhotos ] = useState([]);

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
      
      setPhotos(res);
    })
    .catch(e => console.log('error: ' + e)); 


    return function cleanup() {
      controller.abort();
    }
  },[]);

  return (
    <React.Fragment>
      <CssBaseline />
      
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
            {photos.map(photo => (
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
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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