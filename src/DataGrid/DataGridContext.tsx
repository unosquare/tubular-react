import * as React from 'react';
import IDataGridStorage from '../DataGridInterfaces/IDataGridStorage';
import { DataSourceContext } from '../DataSource/DataSourceContext';
import LocalStorage from '../DataSource/LocalStorage';
import { ToolbarOptions } from '../Models';

let counter = 0;

export interface IDataGridContext {
    gridName?: string;
    storage?: IDataGridStorage;
    toolbarOptions?: ToolbarOptions;
}

export const DataGridContext = React.createContext<IDataGridContext>(null);

export const DataGridProvider = ({ gridName, toolbarOptions, storage, children }: any) => {
    const [ isLoaded, setLoaded ] = React.useState(false);
    const { actions } = React.useContext(DataSourceContext);
    const name: string = gridName || `Grid${counter++}`;
    const state: IDataGridContext = {
        gridName: name,
        storage: storage || new LocalStorage(name),
        toolbarOptions: toolbarOptions || new ToolbarOptions(),
    };

    if (!isLoaded) {
        actions.setInitialData(
            state.toolbarOptions.itemsPerPage,
            state.storage,
        );
        setLoaded(true);
    }

    return (
        <DataGridContext.Provider value={state}>
            {children}
        </DataGridContext.Provider>
    );
};
