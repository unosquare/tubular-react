import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    container: {
        marginTop: 52,
        padding: 30,
    },
    link: {
        textDecoration: 'none',
    },
    paper: {
        padding: 10,
    },
};

const DocumentationList = ({ classes }: any) => (
    <Paper className={classes.paper}>
        <List>
            <Typography variant='h5'>
                Documentation
                        </Typography>
            <Divider />
            <Link to='/Documentation/getting-started' className={classes.link}>
                <ListItem button={true}>
                    <ListItemText primary='Getting Started' />
                </ListItem>
            </Link>
            <Link to='/Documentation/datasource' className={classes.link}>
                <ListItem button={true}>
                    <ListItemText primary='Data Source' />
                </ListItem>
            </Link>
            <Link to='/Documentation/props' className={classes.link}>
                <ListItem button={true}>
                    <ListItemText primary='Props' />
                </ListItem>
            </Link>
            <Link to='/Documentation/columnmodel' className={classes.link}>
                <ListItem button={true}>
                    <ListItemText primary='Column Model' />
                </ListItem>
            </Link>
        </List>
    </Paper>
);

export default withStyles(styles)(DocumentationList);
