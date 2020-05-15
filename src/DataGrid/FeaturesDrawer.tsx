import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import { FiltersContainer } from '../Filtering/FiltersContainer';
import PrintIcon from '@material-ui/icons/Print';
import ExportIcon from '@material-ui/icons/ImportExport';
import FilterListIcon from '@material-ui/icons/FilterList';
import ToggleColumnsIcon from '@material-ui/icons/ViewWeek';

import { ColumnModel, CompareOperators, ColumnDataType } from 'tubular-common';
import { Button, Grid, IconButton, AppBar } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
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
    const [tempColumns, setTempColumns] = React.useState(copyColumns(columns));

    const [value, setValue] = React.useState('filters');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const onApplyClick = () => {
        onApplyFeatures(tempColumns);
        togglePanel();
    };

    return (
        <Drawer anchor="right" open={true}>
            <div role="presentation" style={{ height: '100%', width: '375px', padding: 20 }}>
                <Grid container={true} direction="column" justify="space-between" style={{ height: '100%' }}>
                    <Grid item={true}>
                        <AppBar position="static">
                            <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                                <Tab value="filters" icon={<FilterListIcon />} label="Filters" />
                                <Tab value="toggleColumns" icon={<ToggleColumnsIcon />} label="Columns" />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index="filters">
                            <FiltersContainer
                                columns={tempColumns.filter((c) => c.filterable)}
                                onApply={onApplyClick}
                            />
                        </TabPanel>
                        <TabPanel value={value} index="toggleColumns">
                            Toggle Columns
                        </TabPanel>
                    </Grid>
                    <Grid container={true} item={true} direction="row">
                        <Button variant="contained" color="primary" onClick={onApplyClick}>
                            Apply
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={togglePanel} style={{ marginLeft: 10 }}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Drawer>
    );
};
