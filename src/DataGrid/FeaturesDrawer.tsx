import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import { FiltersContainer } from '../Filtering/FiltersContainer';
import { ColumnModel } from 'tubular-common';
import { Button, Grid } from '@material-ui/core';

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
}

export const FeaturesDrawer: React.FunctionComponent<FeaturesDrawerProps> = ({ columns }: FeaturesDrawerProps) => {
    const [value, setValue] = React.useState('filters');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Drawer anchor="right" open={true}>
            <div role="presentation" style={{ height: '100%' }}>
                <Grid container={true} direction="column" justify="space-between" style={{ height: '100%' }}>
                    <Grid item={true}>
                        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                            <Tab value="filters" label="Filters" />
                            <Tab value="toggleColumns" label="Toggle Columns" />
                        </Tabs>
                        <TabPanel value={value} index="filters">
                            <FiltersContainer columns={columns.filter((c) => c.filterable)} onApply={null} />
                        </TabPanel>
                        <TabPanel value={value} index="toggleColumns">
                            Toggle Columns
                        </TabPanel>
                    </Grid>
                    <Grid item={true}>
                        <div>
                            <Button>Yeah</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Drawer>
    );
};
