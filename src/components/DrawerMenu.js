import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountBox from '@material-ui/icons/AccountBox';
import GalleryIcon from '@material-ui/icons/PhotoLibrary';

import { NavLink as Link } from 'react-router-dom';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  navLink:{
    textDecoration: 'none',
    color: 'inherit'
  }
};

class TemporaryDrawer extends React.Component {
  state = {
    
    left: false,
    
  };

  /* componentDidMount(){
    this.setState(() => {
      return {
        loggedIn : sessionStorage.getItem("rover-view-token") !== null
      }
    })
  } */

  


  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Link activeStyle={styles.navLink} to="/">
            <ListItem button /* onClick={() => this.props.goHome()} */>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary='Rover View' />
            </ListItem>
          </Link>
        </List>
        <Divider /> 
        <List>
          <Link activeStyle={styles.navLink} style={styles.navLink} to="/sign-in">
            <ListItem button  onClick={() =>  this.props.handleMenuNav(0)} >
              <ListItemIcon><AccountBox/></ListItemIcon>
              <ListItemText primary={this.props.loggedIn ? 'Sign Out': 'Sign in'} />
            </ListItem>
          </Link>
          <Link activeStyle={styles.navLink} style={styles.navLink} to="/my-gallery">
            <ListItem button  onClick={() =>  this.props.handleMenuNav(1)} >
              <ListItemIcon><GalleryIcon/></ListItemIcon>
              <ListItemText primary="My Gallery" />
            </ListItem>
          </Link>
          <List>
          
        </List>
        </List>
      </div>
    );

    

    return (
      <div>
        <Drawer open={this.props.isOpen} onClose={() => this.props.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.props.toggleDrawer(false)}
            onKeyDown={() => this.props.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
        
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);


