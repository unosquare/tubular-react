import { Collapse, List, ListItem, ListItemIcon, ListItemText, WithStyles } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';

import * as React from 'react';
import { Link } from 'react-router-dom';
import GitHubIcon from './Github';

const styles: any = {
    flex: {
        flex: 1,
        textAlign: 'center'
    },
    image: {
        maxWidth: 100
    },
    logo: {
        flex: 1,
        maxWidth: 150
    },
    nested: {
        marginLeft: 10
    },
    spacer: {
        flex: '1 1 100%'
    }
};

interface IState {
    openDrawer: boolean;
    openList: boolean;
}

export default withStyles(styles)(class extends React.Component<WithStyles<keyof typeof styles>, IState> {

    public state = {
        openDrawer: false,
        openList: false
    };

    public toggleDrawer = (open: boolean) => () => {
        this.setState({ openDrawer: open });
        if (this.state.openList) {
            this.setState({ openList: open});
        }
    }

    public toggleList = (open: boolean) => () => {
        this.setState({ openList: open });
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position='static' color='primary'>
                    <Toolbar>
                        <Tooltip title='Open'>
                            <IconButton onClick={this.toggleDrawer(true)} color='inherit'>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <img className={classes.logo} src='../../static/tubular.png' alt='Tubular' />
                        <div className={classes.spacer}/>
                        <Tooltip title='Tubular GitHub Repo'>
                            <IconButton
                                component='a'
                                href='https://github.com/unosquare/tubular-react'
                                target='_blank'
                                className={classes.flex}
                                color='inherit'
                            >
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <Drawer variant='persistent' open={this.state.openDrawer} onClose={this.toggleDrawer(false)}>
                    <List>
                        <Tooltip title='Close'>
                            <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                <ListItemIcon><ChevronLeftIcon /></ListItemIcon>
                            </ListItem>
                        </Tooltip>
                        <Divider />
                        <ListItem button={true} onClick={this.toggleDrawer(false)}>
                            <Link to='/'>
                                <ListItemText primary='Home' />
                            </Link>
                        </ListItem>
                        <ListItem button={true} onClick={this.toggleDrawer(false)}>
                            <Link to='/Sample'>
                                <ListItemText primary='Grid Samples' />
                            </Link>
                        </ListItem>
                        <ListItem button={true} onClick={this.toggleList(!this.state.openList)}>
                            <ListItemText primary='Documentation' />
                            {this.state.openList ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.openList} timeout='auto' unmountOnExit={true}>
                            <List component='div' disablePadding={true}>
                                <ListItem button={true} className={classes.nested} onClick={this.toggleDrawer(false)}>
                                    <Link to='/Documentation/Getting-Started'>
                                        <ListItemText primary='Getting Started' />
                                    </Link>
                                </ListItem>
                                <ListItem button={true} className={classes.nested} onClick={this.toggleDrawer(false)}>
                                    <Link to='/Documentation/ColumnModel'>
                                        <ListItemText primary='Column Model' />
                                    </Link>
                                </ListItem>
                                <ListItem button={true} className={classes.nested} onClick={this.toggleDrawer(false)}>
                                    <Link to='/Documentation/DataSource'>
                                        <ListItemText primary='Data Source' />
                                    </Link>
                                </ListItem>
                                <ListItem button={true} className={classes.nested} onClick={this.toggleDrawer(false)}>
                                    <Link to='/Documentation/Props'>
                                        <ListItemText primary='Props' />
                                    </Link>
                                </ListItem>
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItem
                            button={true}
                            component='a'
                            href='https://www.unosquare.com/'
                            target='_blank'
                            onClick={this.toggleDrawer(false)}
                        >
                            <img className={classes.image} src='../../static/logoUnosquare.png' alt='Unosquare' />
                        </ListItem>
                    </List>
                </Drawer>
            </div >
        );
    }
});
