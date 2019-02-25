import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import DataGrid from './DataGrid';

/**
 * This method handle a generic modal to
 * save data in a form.
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
 * }
 */

const DataGridWithRemoteDataSource: React.FunctionComponent = (props: any) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rowInfo, setRowInfo] = useState(null);

    const onClick = (row: any) => () => {
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
            <DataGrid onRowClick={onClick}>
                <IconButton onClick={onAdd}>
                    <AddIcon />
                </IconButton>
            </DataGrid>
            {childrenWithExtraProp}
        </React.Fragment>
    );
};

export default DataGridWithRemoteDataSource;
