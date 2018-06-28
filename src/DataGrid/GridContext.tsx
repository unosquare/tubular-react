import * as React from 'react';

interface IContext {
    actions?: any;
    state?: any;
    columns?: any;
    gridRequest?: any;
    data?: any;
    filteredRecordCount?: any;
}

const GridContext = React.createContext<IContext>({
    actions: null,
    columns: null,
    data: null,
    filteredRecordCount: null,
    gridRequest: null,
    state: null
});

export const GridProvider = GridContext.Provider;
export const GridConsumer = GridContext.Consumer;
