import * as React from 'react';
import ColumnModel from './Models/ColumnModel';

interface IContext {
    actions?: any;
    state?: any;
    columns?: any;
}

const GridContext = React.createContext<IContext>({
    actions: null,
    state: null,
    columns: null
});

export const GridProvider = GridContext.Provider;
export const GridConsumer = GridContext.Consumer;