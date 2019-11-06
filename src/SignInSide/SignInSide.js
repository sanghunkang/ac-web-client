import React, { Component, useHistory } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      component="main"
      className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={props.handleClickSignIn}
            >
              Sign In
            </Button>
            
            <SocialLogins />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={props.handleClickSignUp}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
        
      </Grid>
    </Grid>
  );
}

class SocialLogins extends Component {
  

  render() {
    // var history = useHistory();

    const responseFacebook = (response) => {
      console.log(response);
    }

    const responseGoogle = (response) => {
      console.log(response);
      console.log(response.profileObj);
      if (response.profileObj.email === 'sanghunkang.dev@gmail.com') {
        // history.push("/dashboard");
      }
      
    }

    return (
      <div className="SocialLogins">
        <div p={1}>
          <GoogleLogin
            clientId="292329597156-8s4pmp5lte5pj73jvfa1r45jl18v4big.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            render={renderProps => (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{backgroundColor: "#DB4437"}}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                Sign in with Google
              </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
        <div p={1}>
          <FacebookLogin
            appId="" //APP ID NOT CREATED YET
            render={renderProps => (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{backgroundColor: "#3B5998"}}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                Sign in with Facebook
              </Button>
            )}
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
        <div>
          <KakaoLogin
            jsKey={key}
            render={renderProps => (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{backgroundColor: "#FFE812"}}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                Sign in with Kakao
              </Button>
            )}
            onSuccess={success}
            onFailure={failure}
            buttonText="Button Text"
          />
        </div>
        <div>
          <NaverLogin 
            clientId="sdffdNNFDSjsddiosd"
            callbackUrl="http://127.0.0.1:3000/login"
            render={renderProps => (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{backgroundColor: "#1EC800"}}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                Sign in with Naver
              </Button>
            )}
            onSuccess={(naverUser) => console.log(naverUser)}
            onFailure={(result) => console.error(result)}
          />
        </div>
      </div>
    );
  }
}

 
const key = '4a5607f2dc1622d91b7137fff35a464d';
 
const success = (response) => {
  console.log(response);
};
 
const failure = (error) => {
  console.log(error);
};
 