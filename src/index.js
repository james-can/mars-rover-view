import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CustomTheme from './CustomTheme';
import blue from '@material-ui/core/colors/blue';

const someTheme = createMuiTheme({
    palette: {
        type: 'dark',
        
        secondary: {
          main: '#b71c1c',
        },
        primary: {
            main: '#ab5810',
          },
      },
      typography:{
        useNextVariants: true
      }
});

ReactDOM.render(<MuiThemeProvider theme={someTheme}><App /></MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
