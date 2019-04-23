import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import windowSize from 'react-window-size';

const stationaryStyle = {
   
    width: '100%',
    maxWidth: '600px',
    borderRadius: '9999px', 
    
    backgroundColor: '#ccc'
};

const floatingStyle = {
    bottom: 'auto',
    
    position: 'fixed',
    ...stationaryStyle
};

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
        return (rect.top >= this.props.offset);
    }

    handleScroll = (ev) =>{
        const isFloating = !this.isScrolledIntoView(this.myRef.current);
        
        this.setState({isFloating: isFloating});
    };

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }


  render() {
    // ugly way of determining whether to stack
    // if adding any more instances, then should make this into its own prop
    const shouldStackElement = this.props.offset < -30;
    const posOffset = shouldStackElement ? this.props.offset -64 : this.props.offset; 
    return (
        <React.Fragment>
            <Grid container  >
                <Grid item xs={12}>
                <span style={{}}></span>
                <div  style={{zIndex: this.props.zIndex ,...(this.state.isFloating ? {...floatingStyle, top: 20 - this.props.offset} : stationaryStyle)}} >
                {this.props.children}
                </div>
                </Grid>
            </Grid>
            <span ref={this.myRef} style={{height: '56px', ...(this.props.absolute ? {position: 'absolute', top: posOffset, left: posOffset, }:{})}}/>
       
        </React.Fragment>
    )
  }
}

Floating.defaultProps = {offset: 0, absolute: false, zIndex: 1};

export default windowSize(Floating);
