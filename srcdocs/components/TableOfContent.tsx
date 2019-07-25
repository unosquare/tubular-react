import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { humanize } from 'uno-react';

const useStyles = makeStyles(() => ({
    link: {
        color: '#000',
        textDecoration: 'none',
    },
    list: {
        borderLeft: '1px solid #165FFB',
        height: 'auto',
        padding: '0px',
        position: 'sticky',
        top: '80px',
    },
    padding: {
        marginBottom: '20px',
        paddingBottom: '0px',
        paddingTop: '0px',
    },
}));

export default ({ links, path }: any) => {
    const classes = useStyles({});

    return (
        <List
            component='nav'
            className={classes.list}
        >
            {links.map((id: string) => (
                    <ListItem key={id} className={classes.padding}>
                        <HashLink className={classes.link} to={`${path}${id}`}>
                            <ListItemText primary={humanize(id)} />
                        </HashLink>
                    </ListItem>
                ),
            )}
        </List>
    );
};
