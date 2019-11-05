import React, { Component, Fragment, useHistory } from 'react';
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

import styled from 'styled-components';

import FacebookLogin from 'react-facebook-login';
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
        <SocialLogins />
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

      <FacebookLogin
        appId="" //APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={responseFacebook}
      />

      <GoogleLogin
        clientId="292329597156-8s4pmp5lte5pj73jvfa1r45jl18v4big.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />

      <NaverLogin 
        clientId="sdffdNNFDSjsddiosd"
        callbackUrl="http://127.0.0.1:3000/login"
        render={(props) => <div onClick={props.onClick}>Naver Login</div>}
        onSuccess={(naverUser) => console.log(naverUser)}
        onFailure={(result) => console.error(result)}
      />,

      <Fragment>
          <p><code>No options</code></p>
          <KakaoLogin
            jsKey={key}
            onSuccess={success}
            onFailure={failure}
          />
          <p>Change button text with <code>buttonText</code></p>
          <KakaoLogin
            jsKey={key}
            onSuccess={success}
            onFailure={failure}
            buttonText="Button Text"
          />
          <p>Use style that is defined in KakaoLogin component with <code>useDefaultStyle</code></p>
          <KakaoLogin
            jsKey={key}
            onSuccess={success}
            onFailure={failure}
            useDefaultStyle
          />
          <p>Pass component that is styled as <code>children</code></p>
          <KakaoLogin
            jsKey={key}
            onSuccess={success}
            onFailure={failure}
          >
            <Italic>Children</Italic>
          </KakaoLogin>
          <p>Pass <code>className</code> to style component</p>
          <KakaoLogin
            jsKey={key}
            onSuccess={success}
            onFailure={failure}
            className="css-with-class"
          />
          <p>Pass <code>render</code> function to render fully customized component</p>
          <KakaoLogin
            jsKey={key}
            onSuccess={success}
            onFailure={failure}
            render={props => (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  props.onClick();
                }}
              >
                Render Prop
              </a>
            )}
          />
          <p>Use <code>third party</code>, like <code>styled-components</code></p>
          <StyledKakaoLogin
            jsKey={key}
            onSuccess={success}
            onFailure={failure}
          />
        </Fragment>

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
 
 
const Italic = styled.i`
  color: #3c1e1e;
  font-size: 20px;
  font-weight: 700;
`;

const StyledKakaoLogin = styled(KakaoLogin)`
  display: inline-block;
  padding: 0;
  width: 222px;
  height: 49px;
  line-height: 49px;
  color: #3C1E1E;
  background-color: #FFEB00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  text-align: center;
`;