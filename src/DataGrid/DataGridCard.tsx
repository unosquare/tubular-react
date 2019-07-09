import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnDataType } from 'tubular-common';
import { humanize } from 'uno-react';

const useStyles = makeStyles(({ palette }: any) => ({
    cardActions: {
        justifyContent: 'flex-end',
        paddingTop: 0,
    },
    cardBtn: {
        color: palette.primary.dark,
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
        marginBottom: '3px',
        marginLeft: '2px',
        marginRight: '4px',
        marginTop: '2px',
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

export const DataGridCard = ({ columns, item, onClickCallback }) => {
    const classes = useStyles();

    return (
        <Card className={classes.cardMobile}>
            <CardContent>
                {
                    columns.map((column: any, index: any) => (
                    <div className={classes.dataRow} key={index}>
                        <Typography
                            component='div'
                            variant='body2'
                            color='textSecondary'
                            className={classes.dataLabel}
                        >
                            {humanize(column.Name)}:
                        </Typography>
                        <Typography
                            component='div'
                            variant='body2'
                            color='textSecondary'
                            className={classes.dataValue}
                        >
                        {
                            column.DataType === ColumnDataType.BOOLEAN ?
                            <input type='checkbox' checked={item[column.Name]} disabled={true}/>
                            : column.DataType === ColumnDataType.STRING ?
                            item[column.Name].length > 50 ? item[column.Name].substring(0, 50) + '...'
                            : item[column.Name]
                            : item[column.Name]
                        }
                        </Typography>
                    </div>
                    ))
                }
                <CardActions className={classes.cardActions}>
                    {onClickCallback &&
                        <Button
                            size='small'
                            onClick={onClickCallback}
                            className={classes.cardBtn}
                        >
                            <b>Edit</b>
                        </Button>
                    }
                </CardActions>
            </CardContent>
        </Card>
    );
};
