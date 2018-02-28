import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Link from 'next/link';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import Tooltip from 'material-ui/Tooltip';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

const styles = {
    flex: {
        flex: 1,
        textAlign: 'center'
    },
    image: {
        maxWidth: 100
    },
    logo: {
        maxWidth: 150,
        flex: 1
    },
    nested: {
        marginLeft: 10
    },
    spacer: {
        flex: '1 1 100%'
    }
};

const GitHubIcon = props => (
    <SvgIcon {...props}>
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </SvgIcon>
);

class NavigationBar extends React.Component {
    state = {
        openDrawer: false,
        openList: false
    }
    toggleDrawer = (open) => () => {
        this.setState({ openDrawer: open });
        if(this.state.openList){
            this.setState({ openList: open})
        }
    };
    toggleList = (open) => () => {
        this.setState({ openList: open });
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" color='primary'>
                    <Toolbar>
                        <Tooltip title="Open">
                            <IconButton onClick={this.toggleDrawer(true)} color='inherit'>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <img className={classes.logo} src="./static/tubular.png" alt="Tubular" />
                        <div className={classes.spacer}></div>
                        <Tooltip title="Tubular GitHub Repo">
                            <IconButton component='a' href='https://github.com/unosquare/tubular-react' target='_blank' className={classes.flex} color='inherit'>
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <Drawer variant='persistent' open={this.state.openDrawer} onClose={this.toggleDrawer(false)}>
                    <List>
                        <Tooltip title="Close">
                            <ListItem button onClick={this.toggleDrawer(false)}>
                                <ListItemIcon><ChevronLeftIcon /></ListItemIcon>
                            </ListItem>
                        </Tooltip>
                        <Divider />
                        <ListItem button onClick={this.toggleDrawer(false)}>
                            <Link href="/">
                                <ListItemText primary="Home" />
                            </Link>
                        </ListItem>
                        <ListItem button onClick={this.toggleDrawer(false)}>
                            <Link href="/Sample">
                                <ListItemText primary="Grid Samples" />
                            </Link>
                        </ListItem>
                        <ListItem button onClick={this.toggleList(!this.state.openList)}>
                            <ListItemText primary="Documentation" />
                            {this.state.openList ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.openList} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested} onClick={this.toggleDrawer(false)}>
                                    <Link href="/Documentation/Getting-Started">
                                        <ListItemText primary="Getting Started" />
                                    </Link>
                                </ListItem>
                                <ListItem button className={classes.nested} onClick={this.toggleDrawer(false)}>
                                    <Link href="/Documentation/ColumnModel">
                                        <ListItemText primary="Column Model" />
                                    </Link>
                                </ListItem>
                                <ListItem button className={classes.nested} onClick={this.toggleDrawer(false)}>
                                    <Link href="/Documentation/DataSource">
                                        <ListItemText primary="Data Source" />
                                    </Link>
                                </ListItem>
                                <ListItem button className={classes.nested} onClick={this.toggleDrawer(false)}>
                                    <Link href="/Documentation/Props">
                                        <ListItemText primary="Props" />
                                    </Link>
                                </ListItem>
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItem button component='a' href='https://www.unosquare.com/' target='_blank' onClick={this.toggleDrawer(false)}>
                            <img className={classes.image} src="./static/logoUnosquare.png" alt="Unosquare" />
                        </ListItem>
                    </List>
                </Drawer>
            </div >
        )
    }
}

NavigationBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);