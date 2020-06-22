import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import { FiltersContainer } from '../Filtering/FiltersContainer';
import FilterListIcon from '@material-ui/icons/FilterList';

import { ColumnModel, CompareOperators, ColumnDataType } from 'tubular-common';
import { Button, Grid, AppBar, makeStyles } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
}

const useStyles = makeStyles({
    tabPanel: {
        // It seems the appbar for tabs will always be 72px
        height: 'calc(100% - 72px)',
        overflow: 'auto',
    },
    mainWrapper: {
        height: '100%',
        width: 400,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    featureContainer: {
        overflow: 'hidden',
    },
    actionsArea: {
        paddingTop: 20,
    },
});

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            className={classes.tabPanel}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
};

export interface FeaturesDrawerProps {
    columns: ColumnModel[];
    onApplyFeatures: (columns: ColumnModel[]) => void;
    togglePanel: () => void;
}

const resolveFilterOperator = (column: ColumnModel): CompareOperators =>
    (column.filterOperator =
        column.filterOperator === CompareOperators.None
            ? column.dataType === ColumnDataType.String
                ? CompareOperators.Contains
                : CompareOperators.Equals
            : column.filterOperator);

const copyColumns = (columns: ColumnModel[]): ColumnModel[] =>
    columns.map((column) => ({
        ...column,
        filterOperator: resolveFilterOperator(column),
    }));

export const FeaturesDrawer: React.FunctionComponent<FeaturesDrawerProps> = ({
    columns,
    onApplyFeatures,
    togglePanel,
}: FeaturesDrawerProps) => {
    const tempColumns = copyColumns(columns);
    const classes = useStyles();

    const [value, setValue] = React.useState('filters');

    const handleChange = (_event: React.ChangeEvent<any>, newValue: string) => {
        setValue(newValue);
    };

    const onApplyClick = () => {
        onApplyFeatures(tempColumns);
        togglePanel();
    };

    return (
        <Drawer anchor="right" open={true}>
            <Grid
                role="presentation"
                className={classes.mainWrapper}
                container={true}
                direction="column"
                justify="space-between"
                wrap="nowrap"
                style={{ height: '100%' }}
            >
                <Grid item={true} className={classes.featureContainer}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                            <Tab value="filters" icon={<FilterListIcon />} label="Filters" />
                            {/* <Tab value="toggleColumns" icon={<ToggleColumnsIcon />} label="Columns" /> */}
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index="filters">
                        <FiltersContainer columns={tempColumns.filter((c) => c.filterable)} onApply={onApplyClick} />
                    </TabPanel>
                    {/* <TabPanel value={value} index="toggleColumns">
                            Toggle Columns
                        </TabPanel> */}
                </Grid>
                <Grid container={true} className={classes.actionsArea} item={true} direction="row">
                    <Button variant="contained" color="primary" onClick={onApplyClick}>
                        Apply
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={togglePanel} style={{ marginLeft: 10 }}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Drawer>
    );
};
