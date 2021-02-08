import 'date-fns';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider, DatePicker } from '@material-ui/pickers';
import { ColumnModel, CompareOperators } from 'tubular-common';
import { TextField } from '@material-ui/core';

export interface DateFilterProps {
    column: ColumnModel;
    onApply: () => void;
}

const getInitialDates = (column: ColumnModel) => {
    const dates: [Date, Date] = [null, null];

    const startDate = Date.parse(column.filterText);

    if (!isNaN(startDate)) {
        dates[0] = new Date(startDate);
    }

    const toDate = Date.parse(column.filterArgument && column.filterArgument[0] ? column.filterArgument[0].toString() : null);

    if (!isNaN(startDate)) {
        dates[1] = new Date(toDate);
    }

    return dates;
};

export const DateFilter: React.FunctionComponent<DateFilterProps> = ({ column }: DateFilterProps) => {
    const [dates, setDates] = React.useState(getInitialDates(column));

    const handleDateChange = (isSecondInput?: boolean) => (date: Date | null | undefined) => {
        const normalizedDate = !!date ? date : null;
        if (isSecondInput) {
            column.filterArgument = [];
            setDates([dates[0], normalizedDate]);
            column.filterArgument[0] = normalizedDate ? normalizedDate.toISOString() : null;
        } else {
            setDates([normalizedDate, dates[1]]);
            column.filterText = normalizedDate ? normalizedDate.toISOString() : null;
        }
    };

    const isBetween = column.filterOperator === CompareOperators.Between;

    return (
        <LocalizationProvider dateAdapter={DateFnsUtils}>
            <Grid container={true} direction="column">
                <Grid item={true}>
                    <DatePicker
                        label={isBetween ? 'From' : 'Select a date'}
                        value={dates[0]}
                        onChange={handleDateChange()}
                        renderInput={(props) => <TextField {...props} />}
                    />
                </Grid>
                {column.filterOperator === CompareOperators.Between && (
                    <Grid item={true}>
                        <DatePicker
                            label="To"
                            value={dates[1]}
                            onChange={handleDateChange(true)}
                            renderInput={(props) => <TextField {...props} />}
                        />
                    </Grid>
                )}
            </Grid>
        </LocalizationProvider>
    );
};
