import {
    AppBar, Collapse, Divider, Drawer, IconButton, List, ListItem,
    ListItemIcon, ListItemText, Theme, Toolbar, Tooltip, WithStyles,
    withStyles
} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

import { ChevronLeft, ExpandLess, ExpandMore, Menu } from '@material-ui/icons';

import * as  React from 'react';
import { Link } from 'react-router-dom';
import GitHubIcon from './Github';

const styles: any = (theme: Theme) => createStyles({
    flex: {
        flex: 1,
        textAlign: 'center'
    },
    image: {
        maxWidth: 100
    },
    link: {
        textDecoration: 'none'
    },
    logo: {
        maxWidth: 150
    },
    nested: {
        marginLeft: 10
    },
    spacer: {
        flex: '1 1 100%'
    }
});

interface IProps extends WithStyles<typeof styles> {}

const NavigationBar =
    withStyles(styles)( class extends React.Component<IProps> {
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
                                <Menu />
                            </IconButton>
                        </Tooltip>
                        <img
                            className={classes.logo}
                            src='https://unosquare.github.io/tubular-react/static/tubular.png'
                            alt='Tubular'
                        />
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
                                <ListItemIcon><ChevronLeft /></ListItemIcon>
                            </ListItem>
                        </Tooltip>
                        <Divider />
                        <Link to='/' className={classes.link}>
                            <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                <ListItemText primary='Home'/>
                            </ListItem>
                        </Link>
                        <Link to='/sample' className={classes.link}>
                            <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                <ListItemText primary='Samples'/>
                            </ListItem>
                        </Link>
                        {/* <ListItem button={true} onClick={this.toggleDrawer(false)}/> */}
                        <ListItem button={true} onClick={this.toggleList(!this.state.openList)}>
                            <ListItemText primary='Documentation' />
                            {this.state.openList ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.openList} timeout='auto' unmountOnExit={true}>
                            <List component='div' disablePadding={true}>
                                <Link to='/documentation/getting-started' className={classes.link}>
                                    <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                        <ListItemText primary='Getting Started'/>
                                    </ListItem>
                                </Link>
                                <Link to='/documentation/columnmodel' className={classes.link}>
                                    <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                        <ListItemText primary='Column Model'/>
                                    </ListItem>
                                </Link>
                                <Link to='/documentation/datasource' className={classes.link}>
                                    <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                        <ListItemText primary='Data Source'/>
                                    </ListItem>
                                </Link>
                                <Link to='/documentation/props' className={classes.link}>
                                    <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                        <ListItemText primary='Props'/>
                                    </ListItem>
                                </Link>
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
                            <img
                                className={classes.image}
                                src='https://unosquare.github.io/tubular-react/static/logoUnosquare.png'
                                alt='Unosquare'
                            />
                        </ListItem>
                    </List>
                </Drawer>
            </div >
        );
    }
});

export default withStyles(styles)<any>(NavigationBar);
