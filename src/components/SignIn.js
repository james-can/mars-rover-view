import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import Redirect from 'react-router-dom/Redirect';
import { Link as RouterLink } from 'react-router-dom';

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
  infoMessage:{
    display: 'flex',
    alignItems: 'center'
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
    hasLoginError: false,
    redirect: {
      active: false,
      route: '/'
    }
  }

  controller = new AbortController();
  signal = this.controller.signal;

  validateEmail = (email) =>{
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  }

  componentDidMount(){
    
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const validEmail = this.validateEmail(this.state.email);
    let emailErrMsg = validEmail ? '' : 'Please enter a valid email';
    this.setState(() => {
      return {
        emailErrorText: emailErrMsg,
        hasEmailError : !validEmail
      }
    })

    
    if(!validEmail || this.state.hasPasswordError)
      return;


    fetch('https://shielded-woodland-10835.herokuapp.com/auth', {
      method: 'POST',
      signal: this.signal,
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((res) => {
      if(!res.ok){
        console.log('error with new account request');
        this.setState({hasLoginError: true});
        throw new Error('Failed to authenticate, status=' + res.status);
      }
        

      return res.text();
    })
    .then((res) => {
      console.log(this.props.match);
      this.props.login(this.state.email, res);
      console.log('this.props.referrer: ' + this.props.referrer);
      this.setState({
        redirect:
        {
          active: true, 
          // if user was routed here after clicking my gallery, send them to the place they were trying to get to originally
          route: this.props.referrer === 1 ? '/my-gallery' : '/'} 
        })
    })
    .catch(e => console.log('error: ' + e)); 

  }

  

  handleTextChange(field, ev){
    ev.persist();
    
    this.setState(() => ({
      [field] : ev.target.value
    }))
  }

  
    
  render(){
    const { classes } = this.props;
    const { redirect } = this.state;
    
    if(redirect.active){
      return <Redirect to={redirect.route}/>
    }
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(ev) => this.handleSubmit(ev)}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input type="text" autoComplete="email" autoFocus value={this.state.email} onChange={(ev) => this.handleTextChange('email', ev)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={(ev) => this.handleTextChange('password', ev)}/>
            </FormControl>
            <Grid container justify="space-between">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <RouterLink style={{textDecoration: 'none',color: 'inherit'}} to="/create-account">
            <Link
              
              variant="body2"
              onClick={() => {
                this.props.handleMenuNav(3)
              }}
            >
              Create Account
              
            </Link>
            </RouterLink>
            </Grid>
            <FormControl error>
            {this.state.hasLoginError && <FormHelperText >Invalid email or password</FormHelperText>}
            </FormControl>
            <FormControl>
            {this.props.referrer === 1 && <FormHelperText filled className={classes.infoMessage} ><InfoIcon fontSize="small"/> &nbsp; You must be logged in to access that page</FormHelperText>}
            </FormControl>
            <Button
              
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}



export default withStyles(styles)(SignIn);