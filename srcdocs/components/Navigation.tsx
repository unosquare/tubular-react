import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { MenuList, NavBar } from 'uno-material-ui';
import { featurePaths } from '../utils/featuresPaths';
import TubularLogo from '../static/tubular.png';

const useStyles = makeStyles(({ palette }: any) => ({
    collapsable: {
        borderRight: '0.5px solid rgba(0, 0, 0, 0.12)',
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0)',
        margin: '0px !important',
        position: 'initial',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px',
    },
    icon: {
        color: palette.primary.light,
        marginRight: '5px',
    },
    lastLink: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        color: palette.text.primary,
        textDecoration: 'none',
        width: '100%',
    },
    link: {
        color: palette.text.primary,
        textDecoration: 'none',
        width: '100%',
    },
    summary: {
        margin: '0px !important',
        paddingLeft: '16px',
        paddingRight: '16px',
    },
}));

export default () => {
    const classes = useStyles({});

    return (
        <React.Fragment>
            <NavBar logo={TubularLogo} />
            <MenuList>
                <Link to="/tubular-react/" className={classes.link}>
                    <ListItem button={true}>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <ExpansionPanel className={classes.collapsable}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="features" className={classes.summary}>
                        <Typography>Features</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        {featurePaths.map((x, i) => (
                            <Link
                                key={i}
                                to={x.path}
                                className={i >= featurePaths.length - 1 ? classes.lastLink : classes.link}
                            >
                                <ListItem button={true}>
                                    <ListItemText primary={x.name} />
                                </ListItem>
                            </Link>
                        ))}
                        <Divider />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Link to="/tubular-react/ComponentAPI" className={classes.link}>
                    <ListItem button={true}>
                        <ListItemText primary="ComponentAPI" />
                    </ListItem>
                </Link>
            </MenuList>
        </React.Fragment>
    );
};
