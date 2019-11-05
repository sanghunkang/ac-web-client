import React, { useEffect, useState }  from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import XLSX from 'xlsx';

// import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';


import ProblemList from './ProblemList';
import ProblemSetList from './ProblemSetList';
import ProblemAdder from './ProblemAdder';
// import { returnStatement } from '@babel/types';

function createDynamicData(header, row) {
	var result = {};
	header.forEach((key, i) => {
		result[key] = row[i]
	});
	return result
}

function checkValidInput(row) {
	for (let x in row) {
		console.log(row[x]);
		if (row[x] !== '' && row[x] !== undefined) {
			return true
		}
	}
	return false
}

function processGetSetNamesResponse(res) {
	return res.map((row) => {
		return({
			'set_name': row.set_name,
			'problem_type': 'TO BE IMPLEMENTED',
			'owner':  'TO BE IMPLEMENTED',
			'is_open':  'TO BE IMPLEMENTED',
		})
	});
}

function processResponse(res) {
	return res.map((row) => {
		return({
			'problem_id': row.problem_id,
			'question': row.question,
			'answer': row.answer,
			'solution': row.solution
		});
	});
	// var problem = 
	// return [problem]
}

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

// let problemSets = [
// 	{'name': 'commercial_law', 'problem_type': 'OX형', 'owner': 'me', 'is_open': 'false'},
// 	{'name': '토익 900 단어', 'problem_type': '다지선다형', 'owner': 'naldaram', 'is_open': 'true'},
// ]

export default function MyProblemSets(props) {
	const classes = useStyles();
	let { path } = useRouteMatch();
	let [problems, setProblems] = useState([]);
	let [collectionName, setCollectionName] = useState(null);
	let [problemSets, setProblemSets] = useState([]);

	useEffect(() => {
		let baseRoute = '/getSetNames?'; // TODO: URL will be changed
		let queryString = '';//`set_name=${encodeURIComponent(collectionName)}&num_problems=${encodeURIComponent(10)}`;
		let routeQuery = baseRoute + queryString;
		console.log(routeQuery);
		// fetch('/getContents?set_name=commercial_law&num_contents=10')
		fetch(routeQuery)		
      .then((res)=> res.json())
      .then((res)=> {
				console.log(res);
				setProblemSets(processGetSetNamesResponse(res));
				console.log(problems);
			})
      .catch((err)=> console.log(err)) ;
	}, []);
		
	const handleChangeFileLoad = (e) => {
		var files = e.target.files, file;
		if (!files || files.length === 0) {
			return;
		}
		file = files[0];
		console.log(file);
		console.log(file.name);

		var fileReader = new FileReader();
		fileReader.onload = function (e) {
			var data = new Uint8Array(e.target.result);
			var workbook = XLSX.read(data, {type: 'array'});
	
			/* DO SOMETHING WITH workbook HERE */
			// drop_dom_element.addEventListener('drop', handleDrop, false);
		
			/* convert from workbook to array of arrays */
			var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
			var rows = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
			
			let header = rows[0]

			let problems = rows.slice(1, rows.length)
				.map((row)=> createDynamicData(header, row))
				.filter(checkValidInput)
			console.log(problems);
			setProblems(problems);

			// var filename = file.name;
			// // call 'xlsx' to read the file
			// var oFile = XLSX.read(e.target.result, {type: 'binary', cellDates:true, cellStyles:true});
		};
		fileReader.readAsArrayBuffer(file);
	}

	const handleClickSaveProblem = (problem) => {
		console.log(problem);
		// problems.push(problem)
		let apiParams = {
      method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			data: problem,
    };
    fetch('/insertContent', apiParams)
      .then((res)=> res.json())
      .then((res)=> {
				console.log(res);
				setProblems([...problems, problem])
			})
      .catch((err)=> console.log(err));
	}

	const handleClickAddProblemSet = () => {
		props.history.push(`${path}/add-problem-set`)
	}

	const handleClickEdit = (e) => {
		// console.log(e.target);
		// console.log(e.currentTarget);
		console.log(e.currentTarget.getAttribute('collectionName'));
		let collectionName = e.currentTarget.getAttribute('collectionName');
		setCollectionName(collectionName);

		// var url = new URL('http://localhost:7003/getContents')
		// var params = {'set_name': collectionName, 'num_contents': 5}
		// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
		
		let baseRoute = '/getProblems?'; // TODO: URL will be changed
		let queryString = `set_name=${encodeURIComponent(collectionName)}&num_problems=${encodeURIComponent(10)}`;
		let routeQuery = baseRoute + queryString;
		console.log(routeQuery);
		// fetch('/getContents?set_name=commercial_law&num_contents=10')
		fetch(routeQuery)		
      .then((res)=> res.json())
      .then((res)=> {
				console.log(res);
				setProblems(processResponse(res));
				console.log(problems);
			})
      .catch((err)=> console.log(err)) ;
		props.history.push('/dashboard/my-problem-sets/problem-list');
	}

	const handleClickDownload = () => { alert('to be implemented'); }
	const handleClickSettings = () => { alert('to be implemented'); }

  return(
		<main className={classes.content}>
			<div className={classes.appBarSpacer} />
			<Container maxWidth="lg" className={classes.container}>
				<Switch>
					<Route exact path={path}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={12} lg={12}>
								<Paper className={classes.paper}>
									<ProblemSetList
										problemSets={problemSets}
										handleClickEdit={handleClickEdit}
										handleClickDownload={handleClickDownload}
										handleClickSettings={handleClickSettings}/>
									<Divider/>
									
									<Button
										type="submit"
										variant="contained"
										color="primary"
										className={classes.submit}
										onClick={handleClickAddProblemSet}>
										문제세트 추가하기
									</Button>
								</Paper>
							</Grid>
						</Grid>
					</Route>

					<Route path={`${path}/problem-list`}>
						<ProblemAdder
							handleChangeFileLoad={handleChangeFileLoad}
							handleClickSaveProblem={handleClickSaveProblem}>
						</ProblemAdder>
						<Grid container spacing={3}>
							<Grid item xs={12} md={12} lg={12}>

							<Paper className={classes.paper}>
								<ProblemList
									problems={problems}/>
							</Paper>
							</Grid>
						</Grid>
					</Route>
					<Route path={`${path}/add-problem-set`}>
						<Paper>
							Making
						</Paper>
					</Route>				
				</Switch>	
			</Container>
		</main>		
  );
}

