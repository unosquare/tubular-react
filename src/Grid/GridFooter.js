import React, { Component } from 'react';
import Table, { TableCell, TableFooter, TablePagination, TableRow } from 'material-ui/Table';

class GridFooter extends Component {
  render() {
    return (
      <TableFooter>
        {
          this.props.children
        }
      </TableFooter>
    );
  }
}

export default GridFooter;