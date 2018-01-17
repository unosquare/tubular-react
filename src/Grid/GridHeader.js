import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FilterListIcon from 'material-ui-icons/FilterList';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    dropdown: {
        minWidth: '200px'
    },
    dialog: {
        minWidth: '400px',
        background: 'black'
    }
});

class RsTableHeader extends React.Component {
    static propTypes = {
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                sortable: PropTypes.bool.isRequired
            })).isRequired,
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired
    };

    state = {
        open: false,
        columnType: "",
        filter: "",
        activeFilter: ""
    }

    sortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleFilter = (column) => {
        console.log("Lok'tar Ogar")

        this.setState({ columnType: column.columnType, activeFilter: column.key })

        this.handleClickOpen();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    DialogDropDown = (props) => {
        const value = this.state[this.state.activeFilter] === undefined ? "None" : this.state[this.state.activeFilter];

        const dropdown = this.state.columnType === "text" ?
            (<Select
                className={props.classes.dropdown}
                value={value}
                onChange={this.handleChange}
                input={<Input name={this.state.activeFilter} id="age-simple" />}
            >
                <MenuItem value={'None'}>None</MenuItem>
                <MenuItem value={'Equals'}>Equals</MenuItem>
                <MenuItem value={'Not Equals'}>Not Equals</MenuItem>
                <MenuItem value={'Contains'}>Contains</MenuItem>
                <MenuItem value={'Not Contains'}>Not Contains</MenuItem>
                <MenuItem value={'Starts With'}>Starts With</MenuItem>
                <MenuItem value={'Not Starts With'}>Not Starts With</MenuItem>
                <MenuItem value={'Ends With'}>Ends With</MenuItem>
                <MenuItem value={'Not Ends With'}>Not Ends With</MenuItem>
            </Select>)
            :
            (<Select
                className={props.classes.dropdown}
                value={value}
                onChange={this.handleChange}
                input={<Input name={this.state.activeFilter} id="age-simple" />}
            >
                <MenuItem value={'None'}>None</MenuItem>
                <MenuItem value={'Equals'}>Equals</MenuItem>
                <MenuItem value={'Between'}>Between</MenuItem>
                <MenuItem value={'>='}>>=</MenuItem>
                <MenuItem value={'>'}>></MenuItem>
                <MenuItem value={'<='}>&#60;=</MenuItem>
                <MenuItem value={'<'}>&#60;</MenuItem>
            </Select>);

        return (
            <div>
                {dropdown}
            </div>
        )
    }

    DialogContent = () => {
        /* if(this.state.) */

        return (
            <div /* style={{ height: '200px', background: 'black' }} */ >
                <TextField/>
                <br/>
                <Button/>
                <Button/>
            </div>
        )
    }

    render() {
        const { columns, orderBy, order, classes } = this.props;
        console.log(classes)
        return (
            <TableHead>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <this.DialogDropDown classes={classes} />
                    <this.DialogContent />
                </Dialog>
                <TableRow>
                    {columns.map(column => {
                        const render = column.sortable ?
                            (<Tooltip title='Sort' placement='bottom-start' enterDelay={300}>
                                <TableSortLabel
                                    active={orderBy === column.key}
                                    direction={order}
                                    onClick={this.sortHandler(column.key)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </Tooltip>)
                            : (column.label);
                        const filter = column.filter ?
                            (<IconButton >
                                <FilterListIcon onClick={() => this.handleFilter(column)} />
                            </IconButton>)
                            : (null);
                        return (
                            <TableCell key={column.key} padding={column.label === '' ? 'none' : 'default'}>
                                {render}
                                {filter}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }
}

/* export default RsTableHeader; */
export default withStyles(styles)(RsTableHeader);
