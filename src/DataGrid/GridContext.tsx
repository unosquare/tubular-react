import * as React from 'react';

interface IContext
{
    state?: any;
    actions?: any;
}

const GridContext = React.createContext<IContext>({
    state: null,
    actions: null
});

export const GridProvider = GridContext.Provider;
export const GridConsumer = GridContext.Consumer;