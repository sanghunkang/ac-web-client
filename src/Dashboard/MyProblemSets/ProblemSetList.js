import React  from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';


import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import SettingsIcon from '@material-ui/icons/Settings';

// const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

export default function ProblemSetList(props) {
	return(
		<React.Fragment>
			<Title>문제 세트 목록</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>이름</TableCell>
						<TableCell>문제유형</TableCell>
						<TableCell>소유자</TableCell>
						<TableCell>공개여부</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.problemSets.map((row, i) => (
						<TableRow key={'problem' + i}>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.problem_type}</TableCell>
							<TableCell>{row.owner}</TableCell>
							<TableCell>{row.is_open}</TableCell>
							{/* <TableCell align="right"> */}
							<TableCell>
								<EditIcon
									collectionName={row.name} // Get Attibute of a target?
									onClick={props.handleClickEdit}/>
								<GetAppIcon	
									onClick={props.handleClickDownload}/>
								<SettingsIcon 
									onClick={props.handleClickSettings}/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}