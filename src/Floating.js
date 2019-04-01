import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';

const stationaryStyle = {
    
    borderRadius: '9999px', 
    paddingLeft: '16px',
    backgroundColor: '#ccc'
};

const floatingStyle = {
    width: '100%',
    maxWidth: '600px',
    bottom: 'auto',
    top: 20,
    position: 'fixed',
    ...stationaryStyle
};

const isScrolledIntoView = (el) => {
    const rect = el.getBoundingClientRect();
    return (rect.top >= 0) && (rect.bottom <= window.innerHeight);
}

export class Floating extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();

        this.state = {
            isFloating: false
        };
    }

    handleScroll = (ev) =>{
        this.setState({isFloating: !isScrolledIntoView(this.myRef.current)});
    };

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }


  render() {
    
    return (
        <React.Fragment>
        <span style={{minWidth:'600px'}}>
        <div  style={this.state.isFloating ? floatingStyle : stationaryStyle} >
        
        {this.props.children}
        
        </div>
        </span>
        <span ref={this.myRef} style={{height: '56px'}}/>
       
        </React.Fragment>
    )
  }
}

export default Floating;
