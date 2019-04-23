import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import SignIn from './components/SignIn';
import Toolbar from '@material-ui/core/Toolbar';
import Album from './components/Album';
import { withStyles } from '@material-ui/core/styles';
import CreateAccount from './components/CreateAccount';
import 'whatwg-fetch';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import TemporaryDrawer from './components/DrawerMenu';
import IconButton from '@material-ui/core/IconButton';
import AppHome from './components/AppHome';
import UserMenu from './components/UserMenu';
import Grid from '@material-ui/core/Grid';



const styles = (theme) => {

    return {
      
      appBar: {
        position: 'relative',
        width: '100%'
      },

      snackBar:{
        color: '#FFF',
        backgroundColor: theme.palette.primary.dark
      }
    }
  };


 
  
  class App extends Component {
    state = {
        pageToDisplay: 2,
        drawerOpen: false,
        loggedIn: false,
        snackbarOpen: false,
        email: ''
    }

    toggleDrawer = ( open)  => {
      console.log('drawer toggled');
      this.setState({
        drawerOpen: open,
      });
      
    };
    
    componentDidMount(){
      
      const tok = sessionStorage.getItem("rover-view-token");

      if(!tok)
      return;

      fetch('http://localhost:3001/users/me', {
        method: 'GET',
        signal: this.signal,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-auth-token': tok
        }
      })
      .then((res) => {
        if(!res.ok){
          console.log('Authentication error occurred');
          this.logOut(false);
        }
          

        return res.json();
      })
      .then((res) => {
        this.setState({
          loggedIn: true,
          email: res.email
        })
        
      })
      .catch(e => console.log('error: ' + e));
    }

    goHome = () =>{
      console.log('going home');
      this.setState(() => ({
        pageToDisplay: 2
      }))
    }
  
    logOut = (showSnackbar = true) =>{
      console.log('LOGGED OUT');
      sessionStorage.removeItem("rover-view-token");
      this.setState({
        loggedIn:false,
        email: '',
        snackbarOpen: showSnackbar
      })
    }

    handleMenuNav = (index) =>{
      console.log('handlemenunav, index: ' + index);
      this.setState((prevState) => {
        console.log('prevState.loggedIn: ' + prevState.loggedIn);
        let logoutState = {};
        if(index === 0 && prevState.loggedIn){// this means sign out was clicked
          logoutState = {
            loggedIn:false,
            email: '',
            snackbarOpen: true
          };
        } 
          

        console.log('App:handleMenuNav, loggedIn: ' + !(index === 0 && prevState.loggedIn));
        return{
          ...logoutState,
          pageToDisplay: index
        }})
    }

    handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({ snackbarOpen: false });
    };

    login = (email, token, redirect = 2) =>{
      sessionStorage.setItem("rover-view-token", token);
      this.setState(() => {
        return {
          loggedIn : true,
          pageToDisplay : redirect,
          email,
          snackbarOpen: true
        }
      })
    }

    getPageToDisplay = () => [
        <SignIn handleMenuNav={this.handleMenuNav} login={this.login}/>,
        /*referrer of 1 indicates to do automatically navigate to the second element after logging in(album/gallery), default is 2 (home)*/
        this.state.loggedIn ? <Album/> : <SignIn referrer={1} handleMenuNav={this.handleMenuNav} login={this.login}/>,
        <AppHome loggedIn={this.state.loggedIn}/>,
        <CreateAccount login={this.login}/>
    ];

    render() {
      const { classes } = this.props;
      return (
        <React.Fragment>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                {/*<Typography  variant="h6" color="inherit" noWrap>
                    Rover View
                </Typography>*/}
                <Grid container justify="space-between">
                <IconButton onClick={() => this.toggleDrawer(true)} style={{marginLeft: -12, marginRight: 20}} color="inherit" aria-label="Menu">
                <MenuIcon />
                </IconButton> 
                {this.state.loggedIn && <UserMenu email={this.state.email} logOut={this.logOut}/>}
                </Grid>
                <TemporaryDrawer loggedIn={this.state.loggedIn} logout={this.logOut} toggleDrawer={this.toggleDrawer} isOpen={this.state.drawerOpen} goHome={this.goHome} handleMenuNav={this.handleMenuNav}/>
                </Toolbar>
                
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={this.state.snackbarOpen}
                  autoHideDuration={6000}
                  onClose={this.handleSnackbarClose}
                  ContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">{this.state.loggedIn ? `Signed in as ${this.state.email}` : 'Signed out'}</span>}
                  action={[
                    
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      
                      onClick={this.handleSnackbarClose}
                    >
                      <CloseIcon />
                    </IconButton>,
                  ]}
                />
            </AppBar>
            
            {this.getPageToDisplay()[this.state.pageToDisplay]}
        </React.Fragment>
      )
    }
  }
  
  export default withStyles(styles)(App);
  