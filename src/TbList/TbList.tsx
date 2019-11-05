import * as React from 'react';
import { ColumnModel, IDataGridStorage, ITubularHttpClient, NullStorage } from 'tubular-common';
import { IDataGridConfig } from '../DataGridInterfaces/IDataGridConfig';
import useDataGrid from '../Hooks/useDataGrid';
import { TbListWrapper } from './TbListWrapper';

interface IProps {
    columns: ColumnModel[];
    dataSource: any[] | string | Request | ITubularHttpClient;
    deps?: any[];
    gridName: string;
    storage?: IDataGridStorage;
    listItemComponent?: React.FunctionComponent<any>;
    onError?(err: any): void;
    onItemClick?(row: any): void;
}

export const TbList: React.FunctionComponent<IProps> = (props) => {
    const {
        columns,
        dataSource,
        deps,
        gridName,
        onError,
        onItemClick,
        listItemComponent,
        storage,
    } = props;

    const gridConfig: Partial<IDataGridConfig> = {
        gridName,
        itemsPerPage: 15,
        onError,
        storage: new NullStorage(),
    };

    const grid = useDataGrid(columns, gridConfig, dataSource, deps);

    return (
        <TbListWrapper
            grid={grid}
            listItemComponent={listItemComponent}
            onItemClick={onItemClick}
        />
    );
};