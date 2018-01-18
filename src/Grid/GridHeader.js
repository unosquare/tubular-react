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
    },
    applyButton: {
        background: '#28b62c',
        color: 'white'
    },
    clearButton: {
        background: '#ff4136',
        color: 'white'
    }
});

class GridHeader extends React.Component {
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
        activeFilter: "",
        functions: []
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
        this.setState({ columnType: column.columnType, activeFilter: column.key })

        this.handleClickOpen();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleTextFieldChange = name => event => {
        this.setState({
            [this.state.activeFilter + name]: event.target.value,
        });
    };

    functionCleaner = () => {
        var array = Object.assign([], this.state.functions);

        for (var i = 0; i < array.length; i++) {
            if(array[i]['column'] == this.state.activeFilter){
                array.splice(i, 1);
            }
        } 

        return array;
    }

    handleClear = (value1, value2) => {
        var array = this.functionCleaner();

        this.setState({
            functions: array,
            [this.state.activeFilter + value1]: "",
            [this.state.activeFilter + value2]: ""
        }, () => { 
            this.props.filterHandler(this.state.functions) 
        });
    }

    handleApply = (value1, value2) => {
        var array = this.functionCleaner();
        var value = value2 == null ? null : this.state[this.state.activeFilter + 'value2'];

        this.setState({functions: array}, () => {
            /* if(this.state[this.state.activeFilter + 'value'] == "")
                return; */

            this.setState({
                functions: this.state.functions.concat([{
                    column: this.state.activeFilter,
                    filter: this.state[this.state.activeFilter],
                    value: this.state[this.state.activeFilter + 'value'],
                    value2: value
                }])
            }, () => { 
                this.props.filterHandler(this.state.functions) 
            })
        }) 
    }

    DialogContent = (props) => {
        const value = this.state[this.state.activeFilter + 'value'] === undefined ? "" : this.state[this.state.activeFilter + 'value'];
        const value2 = this.state[this.state.activeFilter + 'value2'] === undefined ? "" : this.state[this.state.activeFilter + 'value2'];

        if (this.state[this.state.activeFilter] == 'between') {
            return (
                <div >
                    <TextField id={this.state.activeFilter} label={"Value"} value={value} onChange={this.handleTextFieldChange('value')} />
                    <br />
                    <TextField id={this.state.activeFilter} label={"Value 2"} value={value2} onChange={this.handleTextFieldChange('value2')} />
                    <br />
                    <Button className={props.classes.applyButton} onClick={() => this.handleApply('value', 'value2')} >Apply</Button>
                    <Button className={props.classes.clearButton} onClick={() => this.handleClear('value', 'value2')}>Clear</Button>
                </div>
            )
        } 

        return (
            <div >
                <TextField id={this.state.activeFilter} label={"Value"} value={value} onChange={this.handleTextFieldChange('value')} />
                <br />
                <Button className={props.classes.applyButton} onClick={() => this.handleApply('value', null)}>Apply</Button>
                <Button className={props.classes.clearButton} onClick={() => this.handleClear('value', null)}>Clear</Button>
            </div>
        )
    }

    DialogDropDown = (props) => {
        const value = this.state[this.state.activeFilter] === undefined ? "none" : this.state[this.state.activeFilter];

        const dropdown = this.state.columnType === "string" ?
            (<Select
                className={props.classes.dropdown}
                value={value}
                onChange={this.handleChange}
                input={<Input name={this.state.activeFilter} />}
            >
                <MenuItem value={'none'}>None</MenuItem>
                <MenuItem value={'equals'}>Equals</MenuItem>
                <MenuItem value={'notEquals'}>Not Equals</MenuItem>
                <MenuItem value={'contains'}>Contains</MenuItem>
                <MenuItem value={'notContains'}>Not Contains</MenuItem>
                <MenuItem value={'startsWith'}>Starts With</MenuItem>
                <MenuItem value={'notStartsWith'}>Not Starts With</MenuItem>
                <MenuItem value={'endsWith'}>Ends With</MenuItem>
                <MenuItem value={'notEndsWith'}>Not Ends With</MenuItem>
            </Select>)
            :
            (<Select
                className={props.classes.dropdown}
                value={value}
                onChange={this.handleChange}
                input={<Input name={this.state.activeFilter} />}
            >
                <MenuItem value={'none'}>None</MenuItem>
                <MenuItem value={'equals'}>Equals</MenuItem>
                <MenuItem value={'between'}>Between</MenuItem>
                <MenuItem value={'gte'}>>=</MenuItem>
                <MenuItem value={'gt'}>></MenuItem>
                <MenuItem value={'lte'}>&#60;=</MenuItem>
                <MenuItem value={'lt'}>&#60;</MenuItem>
            </Select>);

        return (
            <div>
                {dropdown}
            </div>
        )
    }

    render() {
        const { columns, orderBy, order, classes } = this.props;

        return (
            <TableHead>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <this.DialogDropDown classes={classes} />
                    <this.DialogContent classes={classes} />
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

export default withStyles(styles)(GridHeader);
