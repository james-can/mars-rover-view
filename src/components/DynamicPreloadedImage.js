import React, { Component } from 'react'

const imageStyle = { 
    margin: '0 auto', 
    width: '100%', 
    position: 'relative',
    top: 0,
    left: 0
};

export default (props) =>{
    return (
        <React.Fragment>
        <img style={{height: `${1 / props.aspect}%`, ...imageStyle}} src={props.src} hidden={!props.show}/>
        
                
                </React.Fragment>
    )
}