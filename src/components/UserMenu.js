import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuItemChild from './MenuItemChild';
import Tooltip from '@material-ui/core/Tooltip';
import { Link as RouterLink } from 'react-router-dom';
class UserMenu extends Component {
    state = {
        anchorEl: null
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    
    render() {
        
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
            <Tooltip title={this.props.email}>
            
            <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: "top",
                horizontal: "right"
                }}
                transformOrigin={{
                vertical: "top",
                horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
            >
                
                <MenuItem onClick={() => this.props.logOut()}>
                    <MenuItemChild>
                        <RouterLink style={{textDecoration: 'none', color: 'inherit'}} to="/sign-in">Sign Out</RouterLink>
                    </MenuItemChild>
                </MenuItem>
                
            </Menu>
            </div>
        )
    }
}

export default UserMenu;