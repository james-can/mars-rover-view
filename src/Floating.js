import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const stationaryStyle = {
   
    width: '100%',
    maxWidth: '600px',
    borderRadius: '9999px', 
    zIndex: 1,
    backgroundColor: '#ccc'
};

const floatingStyle = {
    bottom: 'auto',
    top: 20,
    position: 'fixed',
    ...stationaryStyle
};

const styles = (theme) => ({
    sliderContainer: {
        padding: '0 20px 0 20px'
    }
});

class Floating extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();

        this.state = {
            isFloating: false
        };
    }

    isScrolledIntoView = (el) => {
        const rect = el.getBoundingClientRect();
        return (rect.top >= this.props.offset) && (rect.bottom <= window.innerHeight - this.props.offset);
    }

    handleScroll = (ev) =>{
        
        this.setState({isFloating: !this.isScrolledIntoView(this.myRef.current)});
    };

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }


  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
            <Grid container  >
                <Grid item xs={12}>
                <span style={{}}></span>
                <div  style={this.state.isFloating ? floatingStyle : stationaryStyle} >
                {this.props.children}
                </div>
                </Grid>
            </Grid>
            <span ref={this.myRef} style={{height: '56px',  ...(this.props.absolute ? {position: 'absolute', top: 0, left: 0,}:{})}}/>
       
        </React.Fragment>
    )
  }
}

Floating.defaultProps = {offset: 0, absolute: false};

export default Floating;
