import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DataGrid from '../DataGrid/DataGrid';

import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';

/**
 * This component handle a generic modal to save data in a form.
 *
 * The following parameter are sent to its children.
 *   onClose: an Event to close the modal
 *   open: a boolean that indicate the if the modal should be open or close
 *   row: the row information of the row clicked in the onClick event
 *
 * Note: The Modal should implement the IFormModal interface.
 *
 * @param props {
 *  onClick: this function will be called when the user click any row, It sends the row information
 *  openModalOnClick: This parameter is suposed to be a boolean. If true, it will open the modal in the onClick event
 *  addIcon: This parameter is a boolean. If true, it add an icon to open the modal
 *  addLabel: This parameter is a string. Indicate the tooltip label to show hover add icon.
 * }
 */
interface IDataGridWithRemoteDataSource {
    refresh?: () => Promise<any>;
    openModalOnClick?: boolean;
    addIcon?: boolean;
    addLabel?: string;
    onClick?(ev: any): void;
}

const DataGridWithRemoteDataSource: React.FunctionComponent<IDataGridWithRemoteDataSource> = (props) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [rowInfo, setRowInfo] = React.useState(null);

    const onRowClick = (row: any) => () => {
        if (props.openModalOnClick) {
            setModalOpen(true);
        }

        setRowInfo(row);

        if (props.onClick) {
            props.onClick(row);
        }
    };

    const onClose = () => {
        setModalOpen(false);
        props.refresh();
    };

    const onAdd = () => {
        setRowInfo(null);
        setModalOpen(true);
    };

    const childrenWithExtraProp = React.Children.map(props.children, (child: any) =>
        React.cloneElement(child, {
            onClose,
            open: modalOpen,
            row: rowInfo,
        }));

    return (
        <React.Fragment>
            <DataGrid onRowClick={onRowClick}>
                {props.addIcon &&
                    <Tooltip title={props.addLabel || 'Add'}>
                        <IconButton onClick={onAdd}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            </DataGrid>
            {childrenWithExtraProp}
        </React.Fragment>
    );
};

export default DataGridWithRemoteDataSource;
