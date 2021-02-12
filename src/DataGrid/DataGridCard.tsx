import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LabelImportant from '@material-ui/icons/LabelImportant';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnDataType, ColumnModel } from 'tubular-common';
import { humanize } from 'uno-js';

const useStyles = makeStyles(() => ({
    cardActions: {
        justifyContent: 'flex-end',
        paddingTop: 0,
    },
    cardBtn: {
        color: 'none',
        textDecoration: 'none',
    },
    cardMobile: {
        marginBottom: '2px',
        marginLeft: '10px',
        marginRight: '10px',
        maxHeight: '400px',
        minHeight: '200px',
        minWidth: '95%',
    },
    dataLabel: {
        flexDirection: 'column',
        flexGrow: 1,
        fontWeight: 'bold',
        margin: '4px',
        textAlign: 'right',
        width: '50%',
    },
    dataRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start ',
    },
    dataValue: {
        flexDirection: 'column',
        flexGrow: 1,
        margin: '2px',
        textAlign: 'left',
        width: '50%',
    },
}));

const renderGeneral = (column: ColumnModel, item: any) => item[column.name];

const renderBoolean = (column: ColumnModel, item: any) => (
    <input type="checkbox" checked={item[column.name]} disabled={true} />
);

const renderString = (column: ColumnModel, item: any) =>
    (item[column.name] && item[column.name].length > 50) ? item[column.name].substring(0, 50) + '...' : renderGeneral(column, item);

const columnRender = (column: ColumnModel, item: any) => {
    switch (column.dataType) {
        case ColumnDataType.Boolean:
            return renderBoolean(column, item);
        case ColumnDataType.String:
            return renderString(column, item);
        default:
            return renderGeneral(column, item);
    }
};

export interface DataGridCardProps {
    columns: ColumnModel[];
    item: any;
    onClickCallback: (row: any) => void;
}

export const DataGridCard = ({ columns, item, onClickCallback }: DataGridCardProps) => {
    const classes = useStyles({});

    return (
        <Card className={classes.cardMobile}>
            <CardContent>
                {columns.map((column: ColumnModel, index: number) => (
                    <div className={classes.dataRow} key={index}>
                        <Typography component="div" variant="body2" color="textSecondary" className={classes.dataLabel}>
                            {humanize(column.name)}:
                        </Typography>
                        <Typography component="div" variant="body2" color="textSecondary" className={classes.dataValue}>
                            {columnRender(column, item)}
                        </Typography>
                    </div>
                ))}
                <CardActions className={classes.cardActions}>
                    {onClickCallback && (
                        <IconButton className={classes.cardBtn} color="default" onClick={onClickCallback} size="small">
                            <LabelImportant />
                        </IconButton>
                    )}
                </CardActions>
            </CardContent>
        </Card>
    );
};
