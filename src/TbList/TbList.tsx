import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, List } from 'react-virtualized';
import { ITbListInstance } from '../HookTypes';
import { generateOnRowClickProxy } from '../utils/helpers';
import { TbListItem } from './TbListItem';

interface IProps {
    tbInstance: ITbListInstance;
    listItemComponent?: React.FunctionComponent<any>;
    onItemClick?(row: any): void;
}

export const TbList: React.FunctionComponent<IProps> = (tbProps) => {
    const {
        tbInstance,
        onItemClick,
        listItemComponent,
    } = tbProps;

    const {
        items,
        hasNextPage,
    } = tbInstance.state.list;

    const loadNextPage = (args) => {
        const pageToLoad = Math.ceil((args.stopIndex) / (tbInstance.state.itemsPerPage - 1)) - 1;
        if (tbInstance.state.isLoading || pageToLoad <= tbInstance.state.page) {
            return;
        }

        // console.log('Loading page: ', pageToLoad);
        tbInstance.api.loadPage(pageToLoad);
    };

    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const cache = new CellMeasurerCache({ defaultHeight: 85, fixedWidth: true });
    const itemCount = tbInstance.state.list.hasNextPage ?
        items.length + 1 :
        items.length;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreItems = loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = (index) => !hasNextPage || index < items.length;

    const ListItemComponent = listItemComponent ? listItemComponent : TbListItem;

    const rowRenderer = (props: any) => {
        const { index, key, style } = props;
        const row = items[index];
        const itemClickProxy = generateOnRowClickProxy(onItemClick)(row);

        let content = null;
        // If this item has not been loaded then
        // We will put a Loading... placeholder
        if (!isItemLoaded(index) || !items[index]) {
            content = (
                <ListItem
                    button={true}
                    style={style}
                >
                    <ListItemText primary='Loading...' />
                </ListItem>
            );
        } else {
            content = (
                <ListItemComponent
                    row={row}
                    onItemClick={itemClickProxy}
                    rowStyle={{ ...style, height: props.height }}
                    columns={tbInstance.state.columns}
                />
            );
        }

        return (
            <CellMeasurer
                key={key}
                cache={cache}
                parent={props.parent}
                columnIndex={0}
                rowIndex={index}
            >
                {content}
            </CellMeasurer>
        );
    };

    return (
        <InfiniteLoader
            isRowLoaded={isItemLoaded}
            loadMoreRows={loadMoreItems}
            ref={tbInstance.state.infiniteLoaderRef}
            rowCount={itemCount}
            threshold={tbInstance.state.itemsPerPage}
        >
            {({ onRowsRendered }) => (
                <AutoSizer>
                    {
                        ({ width, height }) => {
                            return (
                                <List
                                    width={width}
                                    height={height}
                                    deferredMeasurementCache={cache}
                                    rowHeight={cache.rowHeight}
                                    rowRenderer={rowRenderer}
                                    onRowsRendered={onRowsRendered}
                                    rowCount={itemCount}
                                    overscanRowCount={1}
                                />
                            );
                        }
                    }
                </AutoSizer>
            )}
        </InfiniteLoader>
    );
};
