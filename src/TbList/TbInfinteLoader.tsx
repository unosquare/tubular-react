import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, List } from 'react-virtualized';
import { TbListItem } from './TbListItem';

const generateOnRowClickProxy = (onRowClick) => {
    return (row: any) => (ev: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };
};

export const TbInfiniteLoader: React.FunctionComponent<any> = ({
    hasNextPage,
    items,
    loadNextPage,
    grid,
    onItemClick,
    listItemComponent,
}) => {
    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const cache = new CellMeasurerCache({ defaultHeight: 85, fixedWidth: true });
    const itemCount = hasNextPage ? items.length + 1 : items.length;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreItems = loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = (index) => !hasNextPage || index < items.length;

    const ListItemComponent = listItemComponent ? listItemComponent : TbListItem;

    const rowRenderer = (props) => {
        const { index, key, style } = props;
        const row = items[index];
        const itemClickProxy = generateOnRowClickProxy(onItemClick)(row);

        let content = null;
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
                    columns={grid.state.columns}
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
        <div style={{ height: '500px' }}>
            <InfiniteLoader
                isRowLoaded={isItemLoaded}
                loadMoreRows={loadMoreItems}
                rowCount={itemCount}
                threshold={grid.state.itemsPerPage}
            >
                {({ onRowsRendered, registerChild }) => (
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
        </div >
    );
};
