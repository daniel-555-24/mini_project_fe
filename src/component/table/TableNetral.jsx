import React from 'react';
import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";



function createData(username, tweet, location, retweet, protein) {
  return { username, tweet, location, retweet, protein };
}

const rows = [
  createData('Bambang', ' Vaksin Berantas Pandemi https://t.co/zJ76VMoWx5', 'Gorontalo', 24, 4.0),
  createData('Budi susanto', '@Khairykj Hahaha... Tetap ', '-', 37, 4.3),
  createData('zasrusoff', 'Cikgu anti-vaksin > Ditukar ke sekolah', 'Malaysia', 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles((theme) => ({
  paperTable: {
    height: 300,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowY: 'auto',
  },
  cellLimit : {
    display : 'block' , 
    width : '150px',
     whiteSpace : 'nowrap', 
     textOverflow : 'ellipsis', 
     overflow : 'hidden' 
  }
}));

export default function TableNetral(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
      <>
        <TableBody>
        {/* {rows.map((row) => ( */}
            <TableRow onClick={()=> history.push('/user/?' + props.username)}
              key={props.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
            >
              <TableCell component="th" scope="row">
                <span style={{ fontWeight : 'bold'}}>{props.username}</span>
              </TableCell>
              <TableCell align="right" className={classes.cellLimit}>
                {props.tweet}
              </TableCell>
              <TableCell align="right">
                {props.location !== "0" ? props.location : " - "}
              </TableCell>
              <TableCell align="right">
                {props.retweet}
              </TableCell> 
            </TableRow>

        {/* ))} */}
        </TableBody>
      </>
  );
}