import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Code from '@material-ui/icons/Code';
import makeStyles from '@material-ui/styles/makeStyles';
import 'highlight.js/styles/an-old-hope.css';
import * as React from 'react';
import Highlight from 'react-highlight';
import { humanize } from 'uno-react';

const useStyles = makeStyles({
    activeIcon: {
        background: '#165FFB',
        color: '#fff',
        height: '40px',
        marginLeft: 'auto',
        padding: '0px',
        width: '40px',
    },
    code: {
        fontSize: 15,
    },
    description: {
        marginBottom: '20px',
    },
    icon: {
        color: '#000',
        height: '40px',
        marginLeft: 'auto',
        padding: '0px',
        width: '40px',
    },
    paper: {
        padding: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '80px',
    },
});

export default ({ data }: any) => {
    const classes = useStyles({});

    return (
        <div id={data.id}>
            <div className={classes.row}>
                <Typography variant='h5'>{humanize(data.id)}</Typography>
                <Tooltip
                    title={data.open ? 'Hide Code' : 'View Code'}
                >
                    <IconButton
                        className={data.open ? classes.activeIcon : classes.icon}
                        onClick={data.toggle}
                    >
                        <Code />
                    </IconButton>
                </Tooltip>
            </div>
            <Typography variant='h6' className={classes.description}>{data.description}</Typography>
            <Collapse in={data.open} timeout='auto'>
                <Paper>
                    <Highlight
                        language='javascript'
                        className={classes.code}
                    >
                        {data.code}
                    </Highlight>
                </Paper>
            </Collapse>
            {data.sample()}
        </div>
    );
};
