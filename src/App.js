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

const setManifest = (json) => {
  console.log('json: ' + json);
  var roverName = json.photo_manifest.name.toLowerCase();
  rovers[roverName] = json.photo_manifest;

  var newPhotoArray = [];

  const { photos } = json.photo_manifest;


  // since the sols with 0 photos completely omit the element from the array,
  // re-map the array with placeholder elements with value of 0 to make  
  // it easier to navigate

  for(let i = 0, j = 0; newPhotoArray.length < rovers[roverName].max_sol; i++){
    newPhotoArray.push(photos[j].sol === i ? photos[j++] : {sol: i , earth_date: '', total_photos: 0 , cameras: []});
  }

  rovers[roverName].photos = newPhotoArray;
};

const initializeManifest = (index) =>{
  
  let fetchurl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${index}?api_key=DEMO_KEY`;
  console.log('fetchurl: ' + fetchurl);
  fetch(fetchurl)
  .then((response) => {
    return response.json()
  }).then(setManifest).catch((ex) => {
    console.log('parsing failed', ex);
    console.log('typeof ex: ' + typeof ex);

    if(typeof ex == 'object'){
      console.log('ex keys: ' + Object.keys(ex));
    }

    initializeManifest(index);
  });

}

for(let i in rovers){
  initializeManifest(i);
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
    this._totalPhotos = 0;
  }
  get abbrev(){
    return this._abbrev;
  }
  get full(){
    return this._full;
  }
  get totalPhotos(){
    return this._totalPhotos;
  }
  set totalPhotos(total){
    this._totalPhotos = total;
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
const roverNames = ['curiosity', 'opportunity', 'spirit'];

class App extends React.Component{
  constructor(props){
    
    super(props);
    this.state = {
      sliderValue: 0,
      rover: 0,       // index to select which of the three rovers (0: curiosity, 1: opportunity, 2: spirit),
                      // used for the select menu

      roverCamIndex:0,// gets updated with the value of rover when load is clicked.  This is the value
                      // which is actually used to pull data.

      totalPhotos:0,  // total photos for this rover on this sol (as opposed to a specific camera)
      cam: '',
      sol: '0',
      photosAvailable: 3702,
      imageObjects:[],
      photos: [],
      roverCams : [
        [0,1,2,3,4,5,6].map((item)=> cams[item]),
        [0,1,6,7,8].map((item)=> cams[item]),
        [0,1,6,7,8].map((item)=> cams[item])
      ]
    }
  }

  getAvailablePhotos = () =>{
    if(rovers.curiosity.photos && rovers.opportunity.photos && rovers.spirit.photos){
      this.setState((prevState, props)=>({
        photosAvailable : rovers[roverNames[prevState.rover]].photos[prevState.sol || 0].total_photos
      }));
    }
  }

  handleLoadClick = (ev) => {
    
    const fetchUrl = `https://shielded-woodland-10835.herokuapp.com/${roverNames[this.state.rover]}/${this.state.sol}`;
    const self = this;
    fetch(fetchUrl)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setCameraDistrubtion(json.photos);
      
      var newCam;
      self.setState((prevState, props) => {
        newCam = prevState.rover === 0 ? 'mast' : 'pancam';
        
        return {
          photos: json.photos,
          cam: newCam,
          roverCamIndex: prevState.rover
        }
      });
      self.loadImages(newCam);
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
    
  }

  
  loadImages = (camName) => {
    // Thought I needed promises, but looks like I can let the user
      // start browsing the partially loaded photos before they're all 
      // loaded.

      // Will leave it commented for now but probably will delete it entirely
      //var promises = [];
      var images = [];
      const camNameUpper = camName.toUpperCase();
      
      for(let i in this.state.photos){

        // Selectively load the images from the camera the user selects, only once they've selected it.
        if(camNameUpper === this.state.photos[i].camera.name){
          let img = new Image();
          img.src = this.state.photos[i].img_src;
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
      }

      this.setState((prevState, props) =>(
        {
        totalPhotos: images.length,//prevState.photos.length,
        imageObjects: [...images],/* , prevState.imageObjects */
        sliderValue: images.length > 0 ? 1 : 0
      }));

      /* Promise.all(promises).then(()=>{
        console.log('all images loaded');
        
      }).catch((errUrl)=>{
        console.log('failed to load: ' + errUrl);
      }); */
  }

  handleCamChange = (ev) =>{
    
    this.setState({
      cam: ev.target.value
    });
    this.loadImages(ev.target.value);
  }
  
  handleSliderChange = (ev, value) =>{
    this.setState({
      sliderValue: value
    });
  }

  handleRoverChange = (ev) =>{
    
    this.setState({
      rover: ev.target.value,
      
    });
    
    this.getAvailablePhotos();
  }
  

  handleSolChange = (ev) =>{
    const { value } = ev.target;
    if(/^\d*$/.test(value) &&  value >= 0  && value < rovers[roverNames[this.state.rover]].max_sol ){ // make sure the number is a number and is in range
      this.setState({sol: /^0?$/.test(value) ? 0 : value.replace(/^0*/, '')}); // see if input is 0 or empty string, otherwise trim leading zeros
      this.getAvailablePhotos();
    }
  }

  // This is to update the photo count next to each camera in the select menu
  setCameraDistrubtion = (photos) => {
    this.setState((prevState, props) => {

      var cameraPhotoCountMap = {'FHAZ':0, 'RHAZ':0, 'MAST':0, 'CHEMCAM':0, 'MAHLI':0, 'MARDI':0, 'NAVCAM':0, 'PANCAM':0, 'MINITES':0};

      for(let i in photos)
        cameraPhotoCountMap[photos[i].camera.name]++; 

        return {roverCams: prevState.roverCams.map((item, index) => 
          prevState.rover === index ? 
          item.map((_item) => {
            // Spread operator only seems to work on object literals, making this variable necessary:
            let tempCam = {abbrev: _item.abbrev, full: _item.full, totalPhotos: 0};
            return({...tempCam, totalPhotos: cameraPhotoCountMap[_item.abbrev.toUpperCase()]})
          }) 
          : item)}
    });
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
                  
                  {this.state.roverCams[this.state.roverCamIndex].map((item, index) => 
                    (item.totalPhotos > 0 || this.state.cam === item.abbrev) && 
                    <MenuItem 
                      key={index} 
                      value={item.abbrev}>
                      {item.full}{` (${item.totalPhotos})`} 
                      </MenuItem>)}
                  
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
                    value={(this.state.sol)}
                    onChange={this.handleSolChange}
                    type="number"
                    helperText={`of ${rovers[roverNames[this.state.rover]].max_sol - 1 || 2357}`}
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

              {this.state.imageObjects.map((item, index)=>
                <DynamicPreloadedImage aspect={item.width/item.height} 
                  show={this.state.sliderValue - 1 === index} 
                  src={item.src} key={item.src} 
                  alt={`frame ${index}`}/>)}
              
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
