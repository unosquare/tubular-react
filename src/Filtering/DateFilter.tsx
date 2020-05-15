import 'date-fns';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { ColumnModel, CompareOperators } from 'tubular-common';

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

    const toDate = Date.parse(column.filterArgument && column.filterArgument[0] ? column.filterArgument[0] : null);

    if (!isNaN(startDate)) {
        dates[1] = new Date(toDate);
    }

    return dates;
};

export const DateFilter: React.FunctionComponent<DateFilterProps> = ({ column }: DateFilterProps) => {
    const [dates, setDates] = React.useState(getInitialDates(column));

    const handleDateChange = (isSecondInput?: boolean) => (date: Date | null | undefined) => {
        if (isSecondInput) {
            column.filterArgument = [];
            setDates([dates[0], date]);
            column.filterArgument[0] = date ? date.toISOString() : null;
        } else {
            setDates([date, dates[1]]);
            column.filterText = date ? date.toISOString() : null;
        }
    };

    const isBetween = column.filterOperator === CompareOperators.Between;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={true} direction="column">
                <Grid item={true}>
                    <KeyboardDatePicker
                        autoOk={true}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        placeholder={isBetween ? 'From' : 'Selec a date'}
                        value={dates[0]}
                        onChange={handleDateChange()}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                {column.filterOperator === CompareOperators.Between && (
                    <Grid item={true}>
                        <KeyboardDatePicker
                            autoOk={true}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            placeholder="To"
                            value={dates[1]}
                            onChange={handleDateChange(true)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </MuiPickersUtilsProvider>
    );
};
