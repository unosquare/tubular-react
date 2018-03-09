import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    container: {
        marginTop: 52,
        padding: 30
    },
    link: {
        textDecoration: 'none'
    },
    paper: {
        padding: 10,
    }
};

export default withStyles(styles)((props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
            <List>
                <Typography variant='headline'>
                    Introduction
                        </Typography>
                <Divider />
                <Link to='/Documentation/getting-started' className={classes.link}>
                    <ListItem button={true}>
                        <ListItemText primary='Getting Started' />
                    </ListItem>
                </Link>
                <Link to='/Documentation/columnmodel' className={classes.link}>
                    <ListItem button={true}>
                        <ListItemText primary='Column Model' />
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
            </List>
        </Paper>
    );
});
