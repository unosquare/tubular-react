import * as React from 'react';

import { ColumnModel, ITubularHttpClient } from 'tubular-common';
import { ITbListInstance } from '../HookTypes/ITbListInstance';
import { useTubular } from './useTubular';

export const useTbList = (
    initColumns: ColumnModel[],
    source: any[] | string | Request | ITubularHttpClient,
): ITbListInstance => {
    const tubular = useTubular(initColumns, source);
    const infiniteLoaderRef = React.useRef(null);
    const [list, setListState] = React.useState({
        hasNextPage: false,
        items: [],
    });

    const resetList = () => {
        infiniteLoaderRef.current.resetLoadMoreRowsCache(true);
        setListState({ hasNextPage: true, items: [] });
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
                hasNextPage: state.items.length + tubular.state.data.length < tubular.state.totalRecordCount,
                items: [...state.items].concat(
                    ...tubular.state.data,
                ),
            };
        });
    }, [tubular.state.data]);

    return {
        api: {
            loadPage: tubular.api.goToPage,
            search,
            sortByColumn,
        },
        state: {
            ...tubular.state,
            infiniteLoaderRef,
            list,
        },
    };
};
