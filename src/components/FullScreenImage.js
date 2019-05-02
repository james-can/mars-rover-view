import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';


const backGroundStyle = {
    width: 'auto',
    height: 'auto',
    display: 'block',
    overflow: 'auto',
    overflowY: 'scroll',
    userSelect: 'none',
    zIndex: 1000000000,
    position: 'fixed',
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(66,66,66, .9)',
};

const imageStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    maxWidth: '60%', 
    margin: 'auto'
};
const styles = (theme) => {
    return {
      closeButton:{
        position: 'absolute',
        top: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        width: 64,
        height: 64,
        padding: 0
      },
    }
};
function FullScreenImage(props){
    const { classes } = props;
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'scroll';
        }
    }, []);

    return(
        <React.Fragment>
            <div style={backGroundStyle}>       
                    <IconButton
                        
                        key="close"
                        aria-label="Close"
                        color="default"
                        className={classes.closeButton}
                        onClick={props.handleClose}
                        >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                <img src={props.photo.img_src} style={imageStyle} alt={`Full size image id: ${props.photo.id}`}/>
            </div>
        </React.Fragment>
    )
}

export default withStyles(styles)(FullScreenImage);