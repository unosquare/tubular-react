import React from 'react';
import { TablePagination } from 'material-ui/Table';
import TablePaginationActions from './TablePaginationActions';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  spacer: {
    flex: 0
  },
  select: {
    border: '1px solid #c3c3c3',
    borderRadius: '5px'
  }
});

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
      const { totalRecordCount, filteredRecordCount, page, classes } = this.props;
      
      const message = totalRecordCount === filteredRecordCount ?
        ({ from, to, count }) => `${from}-${to} of ${count}` : 
        filteredRecordCount === 0 ?  
          () => '0 records found' :
          ({ from, to, count }) => `${from} to ${to} of ${count} from ${totalRecordCount} records`;

      return(
        <TablePagination
          classes={{
            spacer: classes.spacer,
            select: classes.select
          }}
          labelDisplayedRows={message}
          labelRowsPerPage={'Page size:'}
          count={filteredRecordCount}
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

export default withStyles(styles)(Pager);