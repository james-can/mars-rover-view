import React, { Component } from 'react'

export default (props) =>{
    return (
        <img style={{minHeight: '1000px', margin: 'auto', width: '100%', height: `${1 / props.aspect}%`}} src={props.src} hidden={!props.show}/>
    )
}