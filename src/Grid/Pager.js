import React from 'react';
import { TablePagination } from 'material-ui/Table';
import TablePaginationActions from './TablePaginationActions';

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
      const { rowsPerPage } = this.state;
      const { totalRecordCount, page } = this.props;

      return(
        <TablePagination
          count={totalRecordCount}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[10, 20, 50, 100]}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          Actions={TablePaginationActions}
        />
      );
    }
}

export default Pager;