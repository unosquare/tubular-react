import * as React from 'react';

interface IContext {
    actions?: any;
    state?: any;
}

const GridContext = React.createContext<IContext>({
    actions: null,
    state: null,
});

export const GridProvider = GridContext.Provider;
export const GridConsumer = GridContext.Consumer;