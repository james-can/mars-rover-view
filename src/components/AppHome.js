import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from '@material-ui/core/Paper';
import 'whatwg-fetch';
import FormHelperText from '@material-ui/core/FormHelperText';
import Floating from './Floating';
import windowSize from 'react-window-size';
import MenuItemChild from './MenuItemChild';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { CircularProgress } from '@material-ui/core';



const hexToDec = (hex) => {
  
  let dec = 0;
  const map = {'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15};
  for(let i = 0; i < hex.length; i++ ){
    dec += parseInt('abcdef'.includes(hex[i]) ? map[hex[i]] : hex[i]) * Math.pow(16, hex.length - 1 - i);
  }
  return dec;
};
const hexToRgb = (hex) => [hexToDec(`${hex[1]}${hex[2]}`), hexToDec(`${hex[3]}${hex[4]}`), hexToDec(`${hex[5]}${hex[6]}`)];





const camSelectContainerStyle = {
  position: 'absolute',top: 10,left: 10,
  maxWidth: '600px'
};

const styles = (theme) => {

  const rgb = hexToRgb(theme.palette.primary.main);
  
  
  return {
    slider:{
      padding: theme.spacing.unit,
    },
    floatingDisplay:{
      color: theme.palette.primary.main,
      
    },
    sliderContainer:{
      
      padding: '0 16px'
    },
    camSelect:{
      opacity: 1,
      maxHeight: '100px'
    },
    
    camSelectContainerNested:{
      backgroundColor: `rgba(66,66,66, .9)`,
     
    },

    imageContainer:{
      position: 'relative', left: 0, top: 0,
      alignItems: 'flex-start',
      minHeight: '1000px',
      justifyContent: 'flex-start'
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
      padding: `${theme.spacing.unit}px 0`,
    },
    formControl: {
      margin: theme.spacing.unit,
      width: 120,

    },
    mainField:{
      width: '90%'
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

class AppHome extends React.Component{
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
      ],
      
    }
  }

  getAvailablePhotos = () =>{
    const { rovers } = this.props;
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
          img.originalIndex = i; // This allows for saving the correct image when user adds to gallery
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
    if(/^\d*$/.test(value) &&  value >= 0  && value < this.props.rovers[roverNames[this.state.rover]].max_sol ){ // make sure the number is a number and is in range
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

        return {
          roverCams: prevState.roverCams.map((item, index) => 
          prevState.rover === index ? 
          item.map((_item) => {
            // Spread operator only seems to work on object literals, making this variable necessary:
            let tempCam = {abbrev: _item.abbrev, full: _item.full, totalPhotos: 0};
            return({...tempCam, totalPhotos: cameraPhotoCountMap[_item.abbrev.toUpperCase()]})
          }) 
          : item)
        }
    });
  }

  

  handleSaveImageClick = () =>{
    if(!this.props.loggedIn)
     return;



    const { imageObjects, sliderValue, photos } = this.state;

    fetch('https://shielded-woodland-10835.herokuapp.com/gallery-saves', {
      method: 'POST',
      body: JSON.stringify({
        photo: JSON.stringify(photos[imageObjects[sliderValue - 1].originalIndex])
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-auth-token': sessionStorage.getItem("rover-view-token")
      }
    })
    .then((res) => {
      if(!res.ok)
        throw new Error('HTTP error, status = ' + res.status);
      this.props.openSnackBar('Added to gallery');
      return res.json();
    })
    .then((res) => console.log(res))
    .catch(err => console.log(err));

  }

  render(){
    const { classes } = this.props;
    const camGridSize = 3;
    const camSelectRightBounds = Math.min(this.props.windowWidth, 600) * (camGridSize/12) + 50;
    const shouldStackFloatingElements = camSelectRightBounds > (this.props.windowWidth - 600) / 2;
    return (
     
      <React.Fragment>
        <CssBaseline />
        
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
                    <Grid container  justify="space-evenly" alignItems="center" >
                      {this.props.initialized ?  /* Waiting for information to load */
                        <React.Fragment>
                          <Grid item xs={6} sm={5} >
                            <Grid container justify="center" >
                                <FormControl className={classNames(classes.mainField, classes.formControl)} >
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
                                  <MenuItem value={0}><MenuItemChild>Curiosity</MenuItemChild></MenuItem>
                                  <MenuItem value={1}><MenuItemChild>Opportunity</MenuItemChild></MenuItem>
                                  <MenuItem value={2}><MenuItemChild>Spirit</MenuItemChild></MenuItem>
                                  </Select>
                                  <FormHelperText/>
                                </FormControl>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={1} >
                          </Grid>
                          <Grid item xs={6} sm={3} >
                            <Grid container justify="center">
                                <FormControl className={classNames(classes.mainField, classes.formControl)}>
                                  <TextField 
                                  className={classes.solSpinner}
                                  label="Sol"
                                  value={(this.state.sol)}
                                  onChange={this.handleSolChange}
                                  type="number"
                                  helperText={`of ${this.props.rovers[roverNames[this.state.rover]].max_sol - 1 || 2360}`}
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
                            <FormHelperText>{this.state.photosAvailable} photos available </FormHelperText>
                          </Grid>
                          <Floating 
                            offset={6}
                            zIndex={3}
                            >
                            <Grid container justify="space-evenly" alignItems='center' className={classes.sliderContainer}>
                              <Grid item xs={10}>
                                  <Slider
                                    className={classes.slider}
                                    value={this.state.sliderValue}
                                    min={1}
                                    max={this.state.totalPhotos}
                                    step={1}
                                    onChange={this.handleSliderChange}
                                    />
                              </Grid>
                              <Grid item xs={2} align="center">
                                  <Typography variant="h6" className={classes.floatingDisplay} >
                                    {this.state.sliderValue}
                                  </Typography>
                              </Grid>
                            </Grid>
                          </Floating>
                        </React.Fragment>
                        : <CircularProgress/>}
                    </Grid> 
                    
                  </div>
              </div>
            </div>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              
              <Card className={classes.card}>
                  <CardContent>
                    <div  className={classes.imageContainer}>
                        
                      {this.state.imageObjects.map((item, index)=>
                      <DynamicPreloadedImage 
                      aspect={item.width/item.height} 
                      show={this.state.sliderValue - 1 === index} 
                      src={item.src} 
                      key={item.src} 
                      alt={`frame ${index}`}/>)}
                      
                      

                      {this.state.photos.length > 0 && 
                      <React.Fragment>
                        {this.state.imageObjects.length > 0 && <IconButton onClick={this.handleSaveImageClick} style={{position: 'absolute', top:'5px', right: '5px',  zIndex: 2}}>
                          <Tooltip title={this.props.loggedIn ? 'Add to My Gallery' : 'Sign in to add'}><StarBorderIcon /></Tooltip>
                        </IconButton>}
                        <Floating 
                          offset={shouldStackFloatingElements ? -40 : 16}
                          absolute>
                          
                          <Grid container   justify="space-between" style={{...camSelectContainerStyle, width: this.props.windowWidth - 90}}>
                              <Grid item xs={camGridSize}>
                                <Paper className={classes.camSelectContainerNested}>
                                    <FormControl className={classNames(classes.mainField, classes.formControl)} >
                                      <InputLabel  shrink >
                                          Camera
                                      </InputLabel>
                                      <Select
                                      value={this.state.cam || ' '}
                                      onChange={this.handleCamChange}
                                      input={<Input name="camera"/>}
                                      displayEmpty
                                      name="camera"
                                      className={classNames(classes.selectEmpty)}
                                      >
                                      {this.state.roverCams[this.state.roverCamIndex].map((item, index) => 
                                      (item.totalPhotos > 0 || this.state.cam === item.abbrev) && 
                                      <MenuItem 
                                          key={index} 
                                          value={item.abbrev}>
                                          <MenuItemChild>
                                          {item.full}{` (${item.totalPhotos})`} 
                                          </MenuItemChild>
                                      </MenuItem>
                                      )}
                                      </Select>
                                      <FormHelperText>
                                          {`rover: ${roverNames[this.state.roverCamIndex]}`}
                                      </FormHelperText>
                                    </FormControl>
                                </Paper>
                              </Grid>
                          </Grid>
                        </Floating>
                      </React.Fragment>
                      /*end conditional */}
                    </div>
                  </CardContent>
              </Card>
            </div>
        </main>
      </React.Fragment>
      
    );
  }
}

AppHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default windowSize(withStyles(styles)(AppHome));
