import * as React from 'react';

const GridContext = React.createContext({});

export const GridProvider = GridContext.Provider;
export const GridConsumer = GridContext.Consumer;