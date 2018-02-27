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
        maxWidth: 150
    },
    nested: {
        marginLeft: 10
    }
};

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
                <AppBar position="static" color='inherit'>
                    <Toolbar>
                        <Tooltip title="Open">
                            <IconButton className={classes.menuButton} onClick={this.toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <img className={classes.logo} src="./static/tubular.png" alt="Tubular" />
                    </Toolbar>
                </AppBar>
                <Drawer variant='persistent' open={this.state.openDrawer} onClose={this.toggleDrawer(false)}>
                    <List>
                        <Tooltip title="Close">
                            <ListItem button className={classes.closeButton} onClick={this.toggleDrawer(false)}>
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
                        <ListItem button component='a' href='https://github.com/unosquare/tubular-react' target='_blank' onClick={this.toggleDrawer(false)}>
                            <img className={classes.image} src="./static/GitHub-Logo.png" alt="Github" />
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
            </div >
        )
    }
}

NavigationBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);