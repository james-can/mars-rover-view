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
import FormHelperText from '@material-ui/core/FormHelperText';


//manifest objects to store useful information about each rover
const rovers = {curiosity: {}, opportunity: {}, spirit: {}};





const setManifests = (json) => {
  var roverName = json.photo_manifest.name.toLowerCase();
  rovers[roverName] = json.photo_manifest;

  var newPhotoArray = [];

  const { photos } = json.photo_manifest;


  // since the sols with 0 photos completely omit the element from the array,
  // re-map the array with placeholder elements with value of 0 to make  
  // it easier to navigate

  for(let i = photos[0].sol, j = 0; newPhotoArray.length < rovers[roverName].max_sol; i++){
    newPhotoArray.push(photos[j].sol === i ? photos[j++] : {sol: i , earth_date: '', total_photos: 0 , cameras: []});
  }

  rovers[roverName].photos = newPhotoArray;
};

for(let i in rovers){
  
  let fetchurl = `https://shielded-woodland-10835.herokuapp.com/manifests/${i}`;
  console.log('fetchurl: ' + fetchurl);
  fetch(fetchurl)
  .then(function(response) {
    return response.json()
  }).then(setManifests).catch(function(ex) {
    console.log('parsing failed', ex)
  });


}

const styles = (theme) => {
  
  return {
    slider:{
      padding: theme.spacing.unit
      
    },
    totalSolDisplay:{
      
    },
    solSpinner:{
      
    },
    imageContainer:{
      minHeight: '1000px',
    },
    appBar: {
      position: 'relative',
      width: '100%'
    },
    button:{
      margin: theme.spacing.unit
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
    formControl: {
      margin: theme.spacing.unit,
      width: 120,

    },
    camera:{
      minWidth: 80
    },
    brief:{
      fontSize: '.75em'
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
      cam: 'mast',
      sol: 0,
      photosAvailable: 3702,
      imageObjects:[],
      photos: []
    }
  }

  getAvailablePhotos = () =>{
    if(rovers.curiosity.photos && rovers.opportunity.photos && rovers.spirit.photos){
      this.setState((prevState, props)=>({
        photosAvailable : rovers[roverNames[prevState.rover]].photos[prevState.sol].total_photos
      }));
    }
  }

  handleLoadClick = (ev) => {
    const fetchUrl = `https://shielded-woodland-10835.herokuapp.com/${roverNames[this.state.rover]}/${this.state.sol}/${this.state.cam}`;
    const self = this;
    fetch(fetchUrl)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
     
      // Thought I needed promises, but looks like I can let the user
      // start browsing the partially loaded photos before they're all 
      // loaded.

      // Will leave it commented for now but probably will delete it entirely
      //var promises = [];
      
      var images = [];
      
      for(let i in json.photos){
        let img = new Image();
        img.src = json.photos[i].img_src;
        //promises.push(new Promise((resolve, reject)=>{
          img.onload = () =>{
            //resolve(img.src);
          }
          img.onerror = () =>{
            //reject(img.src);
          }
        //}));

        images.push(img);
      }

      self.setState({
        totalPhotos: json.photos.length,
        photos: json.photos,
        imageObjects: images
      });

      

      /* Promise.all(promises).then(()=>{
        console.log('all images loaded');
      }).catch((errUrl)=>{
        console.log('failed to load: ' + errUrl);
      }); */

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
    console.log('rovername: ' + Object.keys(rovers[roverNames[this.state.rover]]));
    console.log('maxsol: ' + rovers[roverNames[this.state.rover]].max_sol);
    this.setState({
      rover: ev.target.value, 
      sol: 0,
      cam: ev.target.value === 0 ? 'mast' : 'pancam'
    });
    this.getAvailablePhotos();
  }

  handleSolChange = (ev) =>{
    if(/^\d+$/.test(ev.target.value) &&  ev.target.value >= 0  && ev.target.value < rovers[roverNames[this.state.rover]].max_sol ){
      this.setState({sol: parseInt(ev.target.value)});
      this.getAvailablePhotos();
    }
  }

  render(){
    const { classes } = this.props;
    return (
     
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography  variant="h6" color="inherit" noWrap>
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
              <Typography className={classes.brief} variant="h6" align="center" color="textSecondary" paragraph>
                Choose a rover, camera, and sol(Martian day, starting from the beginning of the mission), click load, and use the slider to animate the images
              </Typography>
              <div >
                <Grid container spacing={16} justify="space-evenly" alignItems="center" >
                  <Grid item xs={6} sm={3} >
                  <Grid container justify="center">
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

                  
                  <MenuItem value={0}>Curiosity</MenuItem>
                  <MenuItem value={1}>Opportunity</MenuItem>
                  <MenuItem value={2}>Spirit</MenuItem>
                  
                </Select>
                <FormHelperText/>
                    </FormControl>
                  </Grid>
                  </Grid>
                  <Grid item xs={6} sm={3} >
                  
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
                  
                  {roverCams[this.state.rover].map((item, index) => <MenuItem key={index} value={item.abbrev}>{item.full} </MenuItem>)}
                  
                </Select>
                <FormHelperText></FormHelperText>
            
                    </FormControl>
                 
                  </Grid>
                  <Grid item xs={6} sm={3} >
                  <Grid container justify="center">
                  <FormControl className={classes.formControl}>
                  <TextField 
                    className={classes.solSpinner}
                    label="Sol"
                    value={this.state.sol}
                    onChange={this.handleSolChange}
                    type="number"
                    helperText={`of ${rovers[roverNames[this.state.rover]].max_sol - 1 || 2350}`}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    
                  />
                  </FormControl>
                  </Grid>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                  
                  <Button onClick={this.handleLoadClick} variant="contained" color="primary" className={classes.button} >
                    Load
                  </Button>
                  <FormHelperText>{this.state.photosAvailable} photos available</FormHelperText>
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
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={16}  className={classes.imageContainer}>
            {this.state.imageObjects.map((item, index)=><DynamicPreloadedImage aspect={item.width/item.height} show={this.state.sliderValue - 1 === index} src={item.src} key={item.src} alt={`frame ${index}`}/>)}
              
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
