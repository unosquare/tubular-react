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
    state: null,
    columns: null,
    gridRequest: null,
    data: null,
    filteredRecordCount: null
});

export const GridProvider = GridContext.Provider;
export const GridConsumer = GridContext.Consumer;