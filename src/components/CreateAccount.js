import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Redirect from 'react-router-dom/Redirect';
const PASSWORD = 'password';
const CONFIRM_PASSWORD = 'confirmPassword';
const EMAIL = 'email';
const EMAIL_EXISTS_MSG = 'Email already exists in the system';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
    
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    hasPasswordError: false,
    hasEmailError: false,
    passwordErrorText: '',
    emailErrorText: '',
    redirect: false
  }

  controller = new AbortController();
  signal = this.controller.signal;

  handleSubmit = (ev) => {
    ev.preventDefault();
   
    const validEmail = this.validateEmail(this.state.email.trim());
    let emailErrMsg = validEmail ? '' : 'Please enter a valid email';
    this.setState(() => {
      return {
        emailErrorText: emailErrMsg,
        hasEmailError : !validEmail
      }
    })

    
    if((!validEmail && this.state.emailErrorText !== EMAIL_EXISTS_MSG) || this.state.hasPasswordError)
      return;

    fetch('https://shielded-woodland-10835.herokuapp.com/users', {
      method: 'POST',
      signal: this.signal,
      body: JSON.stringify({
        email: this.state.email.trim(),
        password: this.state.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((res) => {
      if(res.status === 400){
        this.setState(() => {
          return {
            hasEmailError: true,
            emailErrorText: EMAIL_EXISTS_MSG
          }
        })
      }
      if(!res.ok)
        throw new Error('error with new account request, status=' + res.status);

      return res.text();
    })
    .then((res) => {
      this.props.login(this.state.email, res);
      this.setState({redirect: true});
    })
    .catch(e => console.log('error: ' + e));


  }

  componentWillUnmount(){
    this.controller.abort();
  }

  validatePassword = (pw1, pw2) =>{
    
    if(pw1 !== pw2)
      return 'Passwords do not match';

    if(!(/\d/.test(pw1) && /[a-z]/.test(pw1) && /[A-Z]/.test(pw1)))
      return 'Password should include at least one uppercase letter, one lowercase letter, and one number';
    
    if(pw1.length < 8)
      return 'Password should be at least 8 characters';

    return '';
  }

  validateEmail = (email) =>{
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  }

  handleTextChange(field, ev){
    ev.persist();
    this.setState((prevState) => {
      let pwErrMsg = '';
      
      switch(field){
        case EMAIL:
        
        break;
        case PASSWORD:
        pwErrMsg = this.validatePassword(ev.target.value, prevState.confirmPassword);
        break;
        case CONFIRM_PASSWORD:
        pwErrMsg = this.validatePassword(ev.target.value, prevState.password);
      }

      return{
        [field] : ev.target.value,
        passwordErrorText : pwErrMsg,
        hasPasswordError: pwErrMsg.length !== 0,
        
      }
    })
    
  }

    
  render(){
    const { classes } = this.props;
    if(this.state.redirect){
      return <Redirect to={'/'}/>
    }
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <form className={classes.form} onSubmit={(ev) => this.handleSubmit(ev)}>
            <FormControl margin="normal" required fullWidth error={this.state.hasEmailError}>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input type="text" autoComplete="email" autoFocus value={this.state.email} onChange={(ev) => this.handleTextChange('email', ev)}/>
              {this.state.hasEmailError && <FormHelperText >{this.state.emailErrorText}</FormHelperText>}
            </FormControl>
            <FormControl margin="normal" required fullWidth error={this.state.hasPasswordError}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={(ev) => this.handleTextChange('password', ev)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth error={this.state.hasPasswordError}>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input name="password" type="password" id="confirm-password" autoComplete="current-password" value={this.state.confirmPassword} onChange={(ev) => this.handleTextChange('confirmPassword', ev)}/>
              <FormHelperText >{this.state.passwordErrorText}</FormHelperText>
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Account
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);