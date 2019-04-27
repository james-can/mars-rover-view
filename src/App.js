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

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

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
        email: '',
        menuIndexClicked: 0
    }

    controller = new AbortController();
    signal = this.controller.signal;

    toggleDrawer = ( open)  => {
      
      this.setState({
        drawerOpen: open,
      });
      
    };
    
    componentDidMount(){
      console.log(process.env.PUBLIC_URL);      

      const tok = sessionStorage.getItem("rover-view-token");

      if(!tok)
      return;

      console.log('token exists');

      fetch('https://shielded-woodland-10835.herokuapp.com/users/me', {
        method: 'GET',
        signal : this.signal,
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

    componentWillUnmount(){
      this.controller.abort();
    }

    goHome = () =>{
      
      this.setState(() => ({
        pageToDisplay: 2
      }))
    }
  
    logOut = (show = true) =>{
      console.log('LOGGED OUT');
      sessionStorage.removeItem("rover-view-token");
      
      this.openSnackbar('Signed out', show);

      this.setState(() => {

        return {
          loggedIn:false,
          email: '',
          menuIndexClicked: 0
        }
      })
    }

    handleMenuNav = (index) =>{
      
      this.setState((prevState) => {
        
        let logoutState = {};
        if(index === 0 && prevState.loggedIn){// this means sign out was clicked
          this.openSnackbar('Signed out');
          sessionStorage.removeItem('rover-view-token');
          logoutState = {
            loggedIn:false,
            email: '',
            
          };
        } 
          
        return{
          ...logoutState,
          menuIndexClicked: index // 0: sign in/out 1: gallery, 2: home
        }})
    }

    handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({ snackbarOpen: false });
    };

    login = (email, token) =>{
      sessionStorage.setItem("rover-view-token", token);
      this.openSnackbar(`Signed in as ${email}`);
      this.setState((prevState) => {
        return {
          loggedIn : true,
          email,
          
        }
      })
    }

    openSnackbar = (msg, open = true) =>{
      
      this.setState(() => {
        return {
          snackBarMsg: msg,
          snackbarOpen: open
        }
      })
    }

    

    render() {
      const { classes } = this.props;
      const { loggedIn } = this.state;
      return (
        <BrowserRouter baseName={process.env.PUBLIC_URL}>
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
                  message={<span id="message-id">{this.state.snackBarMsg}</span>}
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
            
                <Switch>
                <Route exact path="/" render={(props) => <AppHome loggedIn={this.state.loggedIn} openSnackBar={this.openSnackbar}/>}/>
                <Route exact path="/sign-in" render={(props) => <SignIn referrer={this.state.menuIndexClicked} handleMenuNav={this.handleMenuNav} login={this.login}/>}/>
                <Route exact path="/create-account" render={(props) => <CreateAccount login={this.login}/> }/>
                
                
                <Route path='/my-gallery' render={() => (
                  loggedIn ?
                  <Album/>:
                  <Redirect to="/sign-in"/>
                )}/>
                </Switch>
                
             
            
            
        </React.Fragment>
        </BrowserRouter>
      )
    }
  }
  
  class ProtectedRoute extends Component {
    render() {
      const { component: Component, loggedIn, ...props } = this.props
      
      return (
        <Route 
          {...props} 
          render={props => {
            
            return(
            loggedIn ?
              <Component {...props} /> :
              <Redirect to='/sign-in' />
          )}} 
        />
      )
    }
  }

  export default withStyles(styles)(App);
  