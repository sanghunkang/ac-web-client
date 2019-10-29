import React, { }  from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';





function renderBool(booleanVar) {
	if (booleanVar === true) {
		return "O";
	} else if (booleanVar === false) {
		return "X";
	} else {
		return booleanVar
	}
}

export default function ProblemList(props) {
	return(
		<React.Fragment>
			<Title>문제 목록</Title>

			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>문제번호</TableCell>
						<TableCell>문제</TableCell>
						<TableCell>정답</TableCell>
						<TableCell>해설</TableCell>
						<TableCell align="right">Sale Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.problems.map((row, i) => (
						<TableRow key={'problem' + i}>
							<TableCell>{row.data}</TableCell>
							<TableCell>{row.question}</TableCell>
							<TableCell>{renderBool(row.answer)}</TableCell>
							<TableCell>{row.solution}</TableCell>
							<TableCell align="right">{row.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}