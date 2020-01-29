import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Print from '@material-ui/icons/Print';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { exportGrid } from 'tubular-react-common';
import { Lang } from '../utils/langService';

export interface ExportButtonProps {
    type: string;
    gridName: string;
    filteredRecordCount: number;
    toolTip?: string;
    exportTo: (allRows: boolean, exportFunc: (payload: {}[], columns: ColumnModel[]) => void) => void;
}

export const ExportButton: React.FunctionComponent<ExportButtonProps> = ({
    type,
    gridName,
    toolTip,
    exportTo,
    filteredRecordCount,
}: ExportButtonProps) => {
    const [anchorPrint, setAnchorPrint] = React.useState(null);

    const handlePrintMenu = (event: React.MouseEvent<HTMLElement>): void =>
        setAnchorPrint(event ? event.currentTarget : null);

    const closePrint = () => setAnchorPrint(null);

    const partialExport = (data: [], columns: ColumnModel[]) => {
        exportGrid(type, data, columns, gridName);
        closePrint();
    };

    const printCurrent = () => exportTo(false, partialExport);
    const printAll = () => exportTo(true, partialExport);

    return (
        <React.Fragment>
            <IconButton disabled={filteredRecordCount === 0} onClick={handlePrintMenu}>
                {type === 'print' ? (
                    <Tooltip title={toolTip || Lang.translate('Print')}>
                        <Print />
                    </Tooltip>
                ) : (
                    <Tooltip title={toolTip || Lang.translate('Download')}>
                        <CloudDownload />
                    </Tooltip>
                )}
            </IconButton>
            <Menu anchorEl={anchorPrint} open={Boolean(anchorPrint)} onClose={closePrint}>
                <MenuItem onClick={printCurrent}>{Lang.translate('CurrentRows')}</MenuItem>
                <MenuItem onClick={printAll}>{Lang.translate('AllRows')}</MenuItem>
            </Menu>
        </React.Fragment>
    );
};
