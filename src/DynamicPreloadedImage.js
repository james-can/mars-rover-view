import React, { Component } from 'react'

export default (props) =>{
    return (
        <img src={props.src} hidden={!props.show}/>
    )
}