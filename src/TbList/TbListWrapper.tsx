import * as React from 'react';
import { TbInfiniteLoader } from './TbInfinteLoader';

export const TbListWrapper: React.FunctionComponent<any> = ({
    grid,
    onItemClick,
    listItemComponent,
}) => {
    const [localState, setLocalState] = React.useState({
        hasNextPage: false,
        items: [],
    });

    const loadNextPage = (args) => {

        const pageToLoad = Math.ceil((args.stopIndex) / (grid.state.itemsPerPage - 1)) - 1;
        if (grid.state.isLoading || pageToLoad <= grid.state.page) {
            return;
        }

        console.log('Loading page: ', pageToLoad);
        grid.api.goToPage(pageToLoad);
    };

    React.useEffect(() => {
        setLocalState((state) => {
            return {
                hasNextPage: state.items.length + grid.state.data.length < grid.state.totalRecordCount,
                items: [...state.items].concat(
                    ...grid.state.data,
                ),
            };
        });
    }, [grid.state.data]);

    return (
        <TbInfiniteLoader
            hasNextPage={localState.hasNextPage}
            isNextPageLoading={grid.state.isLoading}
            items={localState.items}
            loadNextPage={loadNextPage}
            grid={grid}
            onItemClick={onItemClick}
            listItemComponent={listItemComponent}
        />
    );
};