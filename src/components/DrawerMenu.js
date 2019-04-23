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


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
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

  

  handleButtonChange = (index) => {
    console.log('index: ' + index);
  };

  goHome = () =>{
    console.log('go home');
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          
            <ListItem button onClick={() => this.props.goHome()}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary='Rover View' />
            </ListItem>
          
        </List>
        <Divider /> 
        <List>
          {[this.props.loggedIn ? 'Sign Out': 'Sign in', 'My Gallery'].map((text, index) => (
            <ListItem button onClick={() => this.props.handleMenuNav(index)} key={text}>
              
              <ListItemIcon>{index % 2 === 0 ? <AccountBox /> : <GalleryIcon />}</ListItemIcon> 
              
              <ListItemText primary={text} />
            </ListItem>
          ))}
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


