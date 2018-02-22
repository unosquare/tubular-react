import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Link from 'next/link';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = {
    container: {
        padding: 30,
        marginTop: 52,
    },
    paper: {
        padding: 10,
    }
};

const DocumentationList = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
            <List>
                <Typography variant='headline'>
                    Introduction
                        </Typography>
                <Divider />
                <ListItem button>
                    <Link href="/Documentation/Getting-Started">
                        <ListItemText primary="Getting Started" />
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link href="/Documentation/ColumnModel">
                        <ListItemText primary="Column Model" />
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link href="/Documentation/DataSource">
                        <ListItemText primary="Data Source" />
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link href="/Documentation/Props">
                        <ListItemText primary="Props" />
                    </Link>
                </ListItem>
            </List>
        </Paper>
    )
}

DocumentationList.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(DocumentationList);