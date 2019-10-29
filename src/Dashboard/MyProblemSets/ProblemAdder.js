import React, { useState }  from 'react';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

import Title from '../Title';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function ProblemAdder(props) {
	// const [values, setValues] = React.useState({
  //   name: 'Cat in the Hat',
  //   age: '',
  //   multiline: 'Controlled',
  //   currency: 'EUR',
  // });
  const classes = useStyles();
  
  const [question, setQuestion] = useState();
  const [solution, setSolution] = useState();
  const [answer, setAnswer] = useState();


  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value)
  }
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value)
  }
  const handleChangeSolution = (e) => {
    setSolution(e.target.value)
  }

	const handleChangeFileLoad = (e) => {
		props.handleChangeFileLoad(e)
  }
  const handleClickSaveProblem = () => {
    var isProblemValid = true;
    let problem = {
      'question': question,
      'answer': answer,
      'solution': solution,
    }

    if (isProblemValid) {
      props.handleClickSaveProblem(problem)
    } else {
      // Print Error Message
    }
  }


	return(
		<Grid container spacing={3}>
			<Grid item xs={12} md={12} lg={12}>
				<Paper className={classes.paper}>
					<Title>문제 추가하기</Title>
					<form className={classes.container} noValidate autoComplete="off">
						<TextField
							id="outlined-name"
							label="문제"
							className={classes.textField}
							onChange={handleChangeQuestion}
							margin="normal"
							variant="outlined"
						/>
            <TextField
							id="outlined-uncontrolled"
							label="정답"
              className={classes.textField}
              onChange={handleChangeAnswer}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							id="outlined-uncontrolled"
							label="해설"
              className={classes.textField}
              onChange={handleChangeSolution}
							margin="normal"
							variant="outlined"
						/>
            <Button
							variant="contained"
              color="primary"
							className={classes.button}
              onClick={handleClickSaveProblem}>
							Save
						</Button>
					</form>
					<Divider/>
					<input
						// accept="image/*"
						className={classes.input}
						style={{ display: 'none' }}
						id="raised-button-file"
						multiple
						type="file"
						onChange={handleChangeFileLoad}/>
					<label htmlFor="raised-button-file">
						<Button
							variant="raised"
							component="span"
							className={classes.button}>
							Upload
						</Button>			
					</label>
				</Paper>
			</Grid>
		</Grid>
	);
}