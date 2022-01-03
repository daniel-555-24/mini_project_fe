import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';



export default function TableHeader() {
  return (
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight : 'bold'}}>Username</TableCell>
            <TableCell style={{ fontWeight : 'bold'}} align="right">Tweet</TableCell>
            <TableCell style={{ fontWeight : 'bold'}} align="right">Location</TableCell>
            <TableCell style={{ fontWeight : 'bold'}} align="right">Attraction</TableCell>
          </TableRow>
        </TableHead>
  );
}