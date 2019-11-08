import * as React from 'react';

import { ColumnModel, ITubularHttpClient } from 'tubular-common';
import { ITbListInstance } from '../HookTypes/ITbListInstance';
import { ITbOptions } from '../HookTypes/ITbOptions';
import { useTubular } from './useTubular';

export const useTbList = (
    initColumns: ColumnModel[],
    source: any[] | string | Request | ITubularHttpClient,
    tubularOptions?: Partial<ITbOptions>,
): ITbListInstance => {
    const tubular = useTubular(initColumns, source, tubularOptions);
    const infiniteLoaderRef = React.useRef(null);

    const [list, setListState] = React.useState({
        hasNextPage: false,
        // We need to hold all the items that we have loaded
        // This will be a cumulated of all of the rows from tubular instance
        items: [],
    });

    // Reset list is required to flush cache from
    // Infinite loader
    const resetList = () => {
        infiniteLoaderRef.current.resetLoadMoreRowsCache(true);
        setListState({ hasNextPage: false, items: [] });
        tubular.api.goToPage(0);
    };

    const sortByColumn = (columnName: string) => {
        resetList();
        tubular.api.sortColumn(columnName);
    };

    const search = (value: string) => {
        resetList();
        tubular.api.updateSearchText(value);
    };

    React.useEffect(() => {
        setListState((state) => {
            return {
                hasNextPage: state.items.length + tubular.state.data.length < tubular.state.filteredRecordCount,
                items: [...state.items].concat(
                    ...tubular.state.data,
                ),
            };
        });
    }, [tubular.state.data]);

    return {
        // API fort a list should be simpler than
        // the one used for a grid
        api: {
            loadPage: tubular.api.goToPage,
            search,
            sortByColumn,
        },
        state: {
            ...tubular.state,
            // This is the ref that will be binded
            // to the actual infinite loader component
            infiniteLoaderRef,
            list,
        },
    };
};
