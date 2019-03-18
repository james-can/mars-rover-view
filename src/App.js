import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';
import DynamicPreloadedImage from './DynamicPreloadedImage'
import 'whatwg-fetch';

const styles = (theme) => {
  
  return {
    slider:{
      padding: '22px'
      
    },
    appBar: {
      position: 'relative',
    },
    button:{
      margin: theme.spacing.unit
    },
    heroUnit: {
      backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
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
    formControl: {
      margin: theme.spacing.unit,
      maxWidth: 120,

    }
  }
};

class cam{
  constructor(abbrev, full){
    this._abbrev = abbrev;
    this._full = full;
  }
  get abbrev(){
    return this._abbrev;
  }
  get full(){
    return this._full;
  }
}

const cams = [
  new cam('fhaz', 'Front Hazard Avoidance'),
  new cam('rhaz', 'Rear Hazard Avoidance'),
  new cam('mast', 'Mast'),
  new cam('chemcam', 'Chemistry and Camera Complex'),
  new cam('mahli', 'Mars Hand Lens Imager'),
  new cam('mardi', 'Mars Descent Imager'),
  new cam('navcam', 'Navigation'),
  new cam('pancam', 'Panoramic'),
  new cam('minites', 'Miniature Thermal Emission Spectrometer')
];

const roverCams = [
  [0,1,2,3,4,5,6].map((item)=> cams[item]),
  [0,1,6,7,8].map((item)=> cams[item]),
  [0,1,6,7,8].map((item)=> cams[item])
];

const roverNames = ['curiosity', 'opportunity', 'spirit'];

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sliderValue: 0,
      rover: 0,
      totalPhotos:0,
      cam: '',
      sol: 0,
      imageObjects:[],
      photos: []
    }
  }

  handleLoadClick = (ev) => {
    console.log('totalphotos: ' + this.state.totalPhotos);
    const fetchUrl = `https://shielded-woodland-10835.herokuapp.com/${roverNames[this.state.rover]}/${this.state.sol}/${this.state.cam}`
    console.log(fetchUrl);
    const self = this;
    fetch(fetchUrl)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json);
     
      
      var images = [];
      var promises = [];
      for(let i in json.photos){
        let img = new Image();
        img.src = json.photos[i].img_src;
        promises.push(new Promise((resolve, reject)=>{
          img.onload = () =>{
            resolve(img.src);
          }
          img.onerror = () =>{
            reject(img.src);
          }
        }));

        images.push(img);

        Promise.all(promises).then(()=>{
          console.log('all images loaded');
          self.setState({
            totalPhotos: json.photos.length,
            photos: json.photos,
            imageObjects: images
          });
        }).catch((errUrl)=>{
          console.log('failed to load: ' + errUrl);
        });

        self.setState({
          totalPhotos: json.photos.length,
          photos: json.photos,
          imageObjects: images
        });
      }
      

    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }

  handleCamChange = (ev) =>{
    console.log('handleCamChange, event: ' + ev);
    this.setState({
      cam: ev.target.value
    });
  }
  
  handleSliderChange = (ev, value) =>{
    this.setState({
      sliderValue: value
    });
  }

  handleRoverChange = (ev) =>{
    this.setState({rover: ev.target.value});
  }

  handleSolChange = (ev) =>{
    this.setState({sol: ev.target.value});
  }

  render(){
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
            Rover View
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Rover View
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Choose a rover, camera, and sol(Martian day, starting from the beginning of the mission), click load, and use the slider to animate the images
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={3}>
                  <FormControl className={classes.formControl}>
                  <InputLabel shrink >
                    Rover
                  </InputLabel>
                  <Select
                    value={this.state.rover}
                    onChange={this.handleRoverChange}
                    input={<Input name="rover"/>}
                    displayEmpty
                    name="rover"
                    className={classes.selectEmpty}
                  >

                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>Curiosity</MenuItem>
                  <MenuItem value={1}>Opportunity</MenuItem>
                  <MenuItem value={2}>Spirit</MenuItem>
                  
                </Select>
            
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                  <FormControl className={classes.formControl}>
                  <InputLabel shrink >
                    Camera
                  </InputLabel>
                  <Select
                    value={this.state.cam}
                    onChange={this.handleCamChange}
                    input={<Input name="cam"/>}
                    displayEmpty
                    name="cam"
                    className={classes.selectEmpty}
                  >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {roverCams[this.state.rover].map((item, index) => <MenuItem key={index} value={item.abbrev}>{item.full} </MenuItem>)}
                  
                </Select>
            
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                  <FormControl className={classes.formControl}>
                  <TextField
                    
                    label="Sol"
                    value={this.state.sol}
                    onChange={this.handleSolChange}
                    type="number"
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    
                  />
                  </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                  <Button onClick={this.handleLoadClick} variant="contained" color="primary" className={classes.button}>
                    Load
                  </Button>
                  </Grid>

                  <Grid item xs={10}>
                  <Slider
                    
                    className={ classes.slider }
                    value={this.state.sliderValue}
                    min={1}
                    max={this.state.totalPhotos}
                    step={1}
                    onChange={this.handleSliderChange}
                  />
                  </Grid>
                  <Grid item xs={2}>
                  <Typography variant="h6" align="center" color="textSecondary" paragraph>
                    {this.state.sliderValue}
                  </Typography>
                  </Grid>

                </Grid>

                
              </div>
            </div>
          </div>
          <div className={classes.layout}>
            {/* End hero unit */}
            <Grid container spacing={40}>
            {this.state.imageObjects.map((item, index)=><DynamicPreloadedImage show={this.state.sliderValue - 1 === index} src={item.src} key={item.src} alt={`frame ${index}`}/>)}
              
            </Grid>
          </div>
        </main>
        
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme: false})(App);
