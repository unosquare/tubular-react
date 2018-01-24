import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableFooter, TablePagination, TableRow } from 'material-ui/Table';

class GridBody extends Component {
  render() {
    return (
      <TableBody>
        {
          this.props.children
        }
      </TableBody>
    );
  }
}

export default GridBody;