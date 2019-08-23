import '../vendor';

import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { featurePaths } from '../utils/featuresPaths';
import ComponentAPI from './Documentation/ComponentAPI';
import Home from './Documentation/Home';
import Sample from './Documentation/Sample';

const useStyles = makeStyles((theme: any) => ({
    content: {
        backgroundColor: theme.palette.background.default,
        flexGrow: 1,
        minWidth: 0,
        overflowY: 'auto',
        padding: theme.spacing(2),
    },
    root: {
        display: 'flex',
        flexGrow: 1,
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
    },
    toolbar: theme.mixins.toolbar,
}));

export default () => {
    const classes = useStyles({});

    return (
        <div className={classes.root}>
            <Navigation />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route exact={true} path='/tubular-react/' component={Home} />
                <Route exact={true} path='/tubular-react/features' component={Sample} />
                {featurePaths.map((x) => (
                    <Route key={x.name} path={x.path} component={x.component} />
                ))}
                <Route path='/tubular-react/componentAPI/' component={ComponentAPI} />
            </main>
        </div>
    );
};
