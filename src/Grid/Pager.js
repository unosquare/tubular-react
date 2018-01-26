import React from 'react';
import Table, { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from 'material-ui/Table';

class Pager extends React.Component {
    state = {
      dataSource: this.props.dataSource,
      page: this.props.page,
      rowsPerPage: this.props.rowsPerPage
    }

    handleChangePage = (event, page) => {
      this.setState({ page }, () => {
        this.state.dataSource.filter(this.state.rowsPerPage, page);
        this.props.handlePager( this.state.rowsPerPage, page );
      });
    };
    
    handleChangeRowsPerPage = event => {
      this.setState({ rowsPerPage: event.target.value }, () => {
        this.state.dataSource.filter(event.target.value, this.state.page);
        this.props.handlePager( event.target.value, this.state.page );
      });
    };

    render(){
      const { rowsPerPage, page } = this.state;
      return(
        <TablePagination
          /* colSpan={1} */
          count={500}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      );
    }
}

export default Pager;