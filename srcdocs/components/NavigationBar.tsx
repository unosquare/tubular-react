import {
    AppBar, Divider, Drawer, IconButton, List, ListItem,
    ListItemIcon, ListItemText, Toolbar, Tooltip, WithStyles,
    withStyles,
} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Menu from '@material-ui/icons/Menu';

import * as  React from 'react';
import { Link } from 'react-router-dom';
import GitHubIcon from './Github';

const styles: any = () => createStyles({
    flex: {
        flex: 1,
        textAlign: 'center',
    },
    image: {
        maxWidth: 100,
    },
    link: {
        textDecoration: 'none',
    },
    logo: {
        maxWidth: 150,
    },
    nested: {
        marginLeft: 10,
    },
    spacer: {
        flex: '1 1 100%',
    },
});

interface IProps extends WithStyles<typeof styles> { }

const NavigationBar =
    withStyles(styles)(class extends React.Component<IProps> {
        public state = {
            openDrawer: false,
            openList: false,
        };

        public toggleDrawer = (open: boolean) => () => {
            this.setState({ openDrawer: open });
            if (this.state.openList) {
                this.setState({ openList: open });
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
                            <div className={classes.spacer} />
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
                            <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                <Link to='/' className={classes.link}>
                                    <ListItemText primary='Home' />
                                </Link>
                            </ListItem>
                            <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                <Link to='/Sample' className={classes.link}>
                                    <ListItemText primary='Grid Samples' />
                                </Link>
                            </ListItem>
                            <ListItem button={true} onClick={this.toggleDrawer(false)}>
                                <Link to='/ComponentAPI' className={classes.link}>
                                    <ListItemText primary='ComponentAPI' />
                                </Link>
                            </ListItem>
                            <Divider />
                            <ListItem
                                button={true}
                                component='a'
                                href='https://www.unosquare.com/'
                                target='_blank'
                                onClick={this.toggleDrawer(false)}
                            >
                                <img className={classes.image} src='https://unosquare.github.io/tubular-react/static/unosquare_logo.svg' alt='Unosquare' />
                            </ListItem>
                        </List>
                    </Drawer>
                </div >
            );
        }
    });

export default withStyles(styles)<any>(NavigationBar);
