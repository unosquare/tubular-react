import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, List, Index, IndexRange } from 'react-virtualized';
import { ITbListInstance } from 'tubular-react-common';
import { TbListItem } from './TbListItem';
import { generateOnRowClickProxy } from 'tubular-react-common';
import { Lang } from '../utils/langService';

export interface TbListProps {
    tbInstance: ITbListInstance;
    listItemComponent?: React.FunctionComponent<any>;
    onItemClick?(row: {}): void;
}

export const TbList: React.FunctionComponent<TbListProps> = tbProps => {
    const { tbInstance, onItemClick, listItemComponent } = tbProps;

    const { items, hasNextPage } = tbInstance.state.list;

    const loadNextPage = (args: IndexRange) => {
        const pageToLoad = Math.ceil(args.stopIndex / (tbInstance.state.itemsPerPage - 1)) - 1;
        if (tbInstance.state.isLoading || pageToLoad <= tbInstance.state.page) {
            return;
        }

        tbInstance.api.loadPage(pageToLoad);

        // We're resolving immediately because tubular will take care of
        // updating the values once the request is complete.
        return Promise.resolve();
    };

    // This cache is enabling better performance when it comes to reload
    // previously loaded items.
    const cache = new CellMeasurerCache({ defaultHeight: 85, fixedWidth: true });
    const noRecordsFound = !hasNextPage && !tbInstance.state.isLoading && items.length === 0;

    // We need a place holder to give user some feedback on what's happening
    const itemCount = tbInstance.state.isLoading || noRecordsFound || hasNextPage ? items.length + 1 : items.length;

    const loadMoreItems = loadNextPage;

    // Every row is loaded except for our Loading/NoRecordsFound indicator.
    const isItemLoaded = (index: Index) => !hasNextPage || index.index < items.length;

    const ListItemComponent = listItemComponent ? listItemComponent : TbListItem;

    const rowRenderer = (props: any) => {
        const { index, key, style } = props;
        const row = items[index];
        const itemClickProxy = generateOnRowClickProxy(onItemClick)(row);
        const isPlaceholder = !isItemLoaded({ index }) || !items[index];
        const itemToRender = (
            <ListItemComponent
                row={row}
                onItemClick={itemClickProxy}
                rowStyle={{ ...style, height: props.height }}
                columns={tbInstance.state.columns}
            />
        );

        const placeholderItem = (placeholderStyle: any) => {
            const placeholderMessage = noRecordsFound ? Lang.translate('NoRecords') : Lang.translate('Loading');
            return (
                <ListItem button={true} style={placeholderStyle}>
                    <ListItemText primary={placeholderMessage} />
                </ListItem>
            );
        };

        const content = isPlaceholder ? placeholderItem(style) : itemToRender;

        return (
            <CellMeasurer key={key} cache={cache} parent={props.parent} columnIndex={0} rowIndex={index}>
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
            {({ onRowsRendered }: any) => (
                <AutoSizer>
                    {({ width, height }: any) => {
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
                    }}
                </AutoSizer>
            )}
        </InfiniteLoader>
    );
};
