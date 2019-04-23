import React, { Component } from 'react';


class MenuItemChild extends Component {

    // This component's sole purpose is a workaround for Material ui issue:
    // https://github.com/material-components/material-components-web/issues/2246
    componentWillUpdate(){
        document.body.style.overflow = 'scroll';
        document.body.style.paddingRight = 0;
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default MenuItemChild
