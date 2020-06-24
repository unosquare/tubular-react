import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { TbSelection } from '../utils/Selection';
import { ColumnModel } from 'tubular-common';

const createRowSelectionFromData = (data: any[], columns: ColumnModel[]) => {
    const keyColumn = columns.find((c) => c.isKey).name;
    const newSelection: any = {};
    data.forEach((row: any) => {
        if (newSelection[row[keyColumn]] === undefined) {
            newSelection[row[keyColumn]] = false;
        }
    });

    return newSelection;
};

export const useTbSelection = (tbInstance: ITbTableInstance, rowSelectionEnabled: boolean): TbSelection => {
    const [rowSelection, setRowSelection] = React.useState({} as any);
    const keyColumn = tbInstance.state.columns.find((c) => c.isKey);
    const toggleRowSelection = (id: string) => setRowSelection({ ...rowSelection, [id]: !rowSelection[id] });
    const getSelectedCount = () => Object.keys(rowSelection).filter((k) => rowSelection[k]).length;
    const getUnSelectedCount = () => Object.keys(rowSelection).filter((k) => !rowSelection[k]).length;
    const getSelectedRows = () => {
        const selectedKeys = Object.keys(rowSelection).filter((k) => rowSelection[k]);
        return tbInstance.state.data.filter((row) => selectedKeys.includes(`${row[keyColumn.name]}`));
    };

    const isIndeterminateSelection = () =>
        Object.keys(rowSelection).length > 0 && getSelectedCount() > 0 && getUnSelectedCount() > 0;

    const toggleAllRowsSelection = () => {
        const newRowSelection = createRowSelectionFromData(tbInstance.state.data, tbInstance.state.columns);
        const unSelectedCount = Object.keys(rowSelection).filter((k) => !rowSelection[k]).length;

        // all rows are selected
        if (unSelectedCount === 0) {
            Object.keys(rowSelection).forEach((f) => (newRowSelection[f] = false));
            setRowSelection(newRowSelection);
            console.log(newRowSelection);
            return;
        }

        // Indeterminate | non-selected
        Object.keys(rowSelection).forEach((f) => (newRowSelection[f] = true));
        console.log(newRowSelection);
        setRowSelection(newRowSelection);
    };

    React.useEffect(() => {
        if (rowSelectionEnabled) {
            const newSelection = createRowSelectionFromData(tbInstance.state.data, tbInstance.state.columns);
            setRowSelection(newSelection);
        }
    }, [tbInstance.state.data]);

    return {
        rowSelection,
        toggleRowSelection,
        toggleAllRowsSelection,
        getSelectedCount,
        getSelectedRows,
        getUnSelectedCount,
        isIndeterminateSelection,
    };
};
