import React from 'react';
import Table, { TableCell, TableFooter, TableRow } from 'material-ui/Table';

const footerRenderer = aggregates => 
  <TableFooter>
    <TableRow>
      <TableCell>Total: </TableCell>
      <TableCell> { aggregates && aggregates.CustomerName } </TableCell>
      <TableCell> ~~~ </TableCell>
      <TableCell> ~~~ </TableCell>
    </TableRow>
  </TableFooter>;

export default footerRenderer;