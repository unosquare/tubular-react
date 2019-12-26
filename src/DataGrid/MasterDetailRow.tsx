import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { useMasterDetails } from 'tubular-react-common';
import DetailComponent from '../DataGridInterfaces/DetailComponent';

interface IProps {
    detail: React.ReactElement<DetailComponent>;
    renderCells: any;
    style: React.CSSProperties;
    clickEvent: (ev: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
    rowData: {};
    columns: ColumnModel[];
}

export const MasterDetailRow: React.FunctionComponent<IProps> = ({
    detail,
    renderCells,
    style,
    clickEvent,
    rowData,
    columns,
}: IProps) => {
    const [open, openDetails] = useMasterDetails();
    const openMasterDetails = () => {
        openDetails();
    };

    const childWithRowData = React.cloneElement(detail, { row: rowData });

    return (
        <>
            <TableRow hover={true} style={style} onClick={clickEvent}>
                <TableCell padding="checkbox" size="small" align="center">
                    <IconButton size="small" onClick={openMasterDetails}>
                        {open ? <MinimizeIcon /> : <AddIcon />}
                    </IconButton>
                </TableCell>
                {renderCells}
            </TableRow>
            {open && (
                <TableRow hover={true} style={style}>
                    <TableCell colSpan={columns.length + 1}>
                        <Collapse in={open} timeout="auto" unmountOnExit={true}>
                            {childWithRowData}
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default MasterDetailRow;
