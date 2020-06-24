[![Analytics](https://ga-beacon.appspot.com/UA-8535255-2/unosquare/tubular-react/)](https://github.com/igrigorik/ga-beacon)
[![npm version](https://badge.fury.io/js/tubular-react.svg)](https://badge.fury.io/js/tubular-react)
![Buils status](https://github.com/unosquare/tubular-react/workflows/Node.js%20Package/badge.svg)

![Tubular-React](https://unosquare.github.io/assets/tubular.png)

:star: _Please star this project if you find it useful!_

**Tubular-React** is a [Material-UI](https://material-ui.com/) table (or data grid) with local or remote data-source. Featuring:

-   Define a custom layout for columns and cells using `render` methods.
-   Use a remote or local datasource. Remote datasource use a specific Request and Response format.
-   Sort and filter multiple columns.
-   Free-text search of string columns.
-   Page data. Remote data is paged in the server side.
-   Export data to a CSV file.
-   Print data.

You can try a [CodeSandbox demo](https://codesandbox.io/s/818mwv72ll).

Please visit the [Tubular GitHub Page](http://unosquare.github.io/tubular) to learn how quickly you can start coding. See [Related projects](#related-projects) below to discover more Tubular libraries and backend solutions.

# Table of contents

-   [Installation](#installation)
-   [Usages](#datagrid)
    -   [DataGrid](#datagrid)
    -   [Run integrated sample](#run-integrated-sample)
-   [i18n Support](#i18n-support)
-   [Related projects](#related-projects)

## Installation

```sh
$ npm install tubular-react --save
```

## Usages

You can check the documentation of the components at [https://unosquare.github.io/tubular/tubular-react](https://unosquare.github.io/tubular/tubular-react)

### `DataGrid`

You can start using `DataGrid` with this sample code. The grid will connect to a remote datasource or have a local datasource depending on what it's passed in the dataSource property.

To create Column you have to use **createColumn** function and have to pass the desired name of column as string.
```js
import React from 'react';
import ReactDOM from 'react-dom';

import { DataGrid } from 'tubular-react';
import {createColumn} from "tubular-common";

const columns = [createColumn('OrderID'), createColumn('CustomerName'), createColumn('ShipperCity')];

const SampleGrid = () => (
    <DataGrid columns={columns} dataSource={'https://tubular.azurewebsites.net/api/orders/paged'} gridName="Grid" />
);

ReactDOM.render(<SampleGrid />, document.getElementById('root'));
```

This is a preview of the previous code:

![DataGrid](https://user-images.githubusercontent.com/25437790/57318742-a7a2b200-70c0-11e9-8d5b-aaf2107bd059.gif)

### Run integrated sample

There is a sample included in this project, you can run it just by doing the following.

```shell
// Install all the dependencies
npm install
// Run the sample project
npm start
```

### Add or Delete a Column
You can add or remove columns quickly and easily.

```js
import * as React from "react";
import { DataGrid, ToolbarOptions } from "tubular-react";
import columns from "./columns";
import { LocalStorage, createColumn } from "tubular-common";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import localData from "./localData";

const ModifyingColumns: React.FunctionComponent = () => {
  const [getErrorMessage, setErrorMessage] = React.useState(null as string);
  const [gridColumns, setGridColumns] = React.useState(columns);
  const [columnCounter, setColumnCounter] = React.useState(0);

  const handleAddColumn = () => {
    setGridColumns([
      ...gridColumns,
      createColumn(`Column ${columnCounter}`, {
        filterable: true,
        searchable: true,
        sortable: true
      })
    ]);

    setColumnCounter(columnCounter + 1);
  };

  const handleDeleteLastColumn = () => {
    setGridColumns([
      ...gridColumns.filter(
        c => c.name !== gridColumns[gridColumns.length - 1].name
      )
    ]);
  };

  const toolbarOptions = new ToolbarOptions({
    customItems: (
      <div>
        <Button onClick={handleAddColumn}>Add new column</Button>
        <Button onClick={handleDeleteLastColumn}>Delete last column</Button>
      </div>
    )
  });

  return (
    <div className="root">
      {getErrorMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          style={{ paddingTop: "10px" }}
          open={true}
          ContentProps={{ "aria-describedby": "message-id" }}
          message={<span id="message-id">{getErrorMessage}</span>}
        />
      )}
      <DataGrid
        columns={gridColumns}
        dataSource={localData}
        gridName="ModifyingColumns"
        storage={new LocalStorage()}
        onError={setErrorMessage}
        toolbarOptions={toolbarOptions}
      />
    </div>
  );
};

ReactDOM.render(<ModifyingColumns />, document.getElementById('root'));
```

This is a preview of the previous code:

![addAndRemoveColumns](https://user-images.githubusercontent.com/36867256/85424009-06cdbb00-b53d-11ea-87b7-2b7b1ae6c96f.gif)

[![Edit ColumnFeatures -Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/columnfeatures-example-wz010?fontsize=14&hidenavigation=1&theme=dark)

### Using a remote data source
It is possible to display data from a remote server.

```js
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { LocalStorage } from 'tubular-common';
import { useGridRefresh } from 'tubular-react-common';
import { DataGrid, ToolbarOptions } from '../../src';
import columns from './data/columns';

const RemoteDataGrid: React.FunctionComponent = () => {
    const [refresh, forceRefresh] = useGridRefresh();
    const forceGridRefresh = () => forceRefresh();

    const rowClick = (row: any) => console.log('You clicked on a row: ', row);

    const toolbarButton = new ToolbarOptions({
        customItems: <Button onClick={forceGridRefresh}>Force refresh</Button>,
    });

    return (
        <DataGrid
            gridName="Tubular-React"
            columns={[...columns]}
            dataSource="https://tubular.azurewebsites.net/api/orders/paged"
            deps={[refresh]}
            onRowClick={rowClick}
            storage={new LocalStorage()}
            toolbarOptions={toolbarButton}
        />
    );
};

ReactDOM.render(<RemoteDataGrid />, document.getElementById('root'));
```

This is a preview of the previous code:

![Remote](https://user-images.githubusercontent.com/36867256/85425475-d71fb280-b53e-11ea-9aee-33308b6f79d4.gif)

[![Edit RemoteDataGrid -Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/remotedatagrid-example-5sis8?fontsize=14&hidenavigation=1&theme=dark)

### Using a local data source
It is possible to display data from a local data source.

```js
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { LocalStorage } from 'tubular-common';
import { DataGrid } from '../../src';
import { ToolbarOptions } from '../../src/Toolbar/ToolbarOptions';
import columns from './data/columns';
import localData from './data/localData';

const LocalDataGrid: React.FunctionComponent = () => {
    const [getErrorMessage, setErrorMessage] = React.useState(null as string);
    const [data, setData] = React.useState(localData);

    const rowClick = (row: {}) => {
        console.log('You clicked on a row: ', row);
    };

    const handleAddRow = () => {
        setData([
            ...data,
            {
                Amount: 150.0,
                CustomerName: 'Tiempo Development',
                OrderID: 23,
                ShippedDate: '2016-01-04T18:00:00',
                ShipperCity: 'Monterrey, NL, Mexico',
            },
        ]);
    };

    const toolbarOptions = new ToolbarOptions({
        customItems: <Button onClick={handleAddRow}>Add new row</Button>,
    });

    return (
        <div className="root">
            {getErrorMessage && (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    style={{ paddingTop: '10px' }}
                    open={true}
                    ContentProps={{ 'aria-describedby': 'message-id' }}
                    message={<span id="message-id">{getErrorMessage}</span>}
                />
            )}
            <DataGrid
                columns={columns}
                dataSource={data}
                gridName="LocalDataGrid"
                storage={new LocalStorage()}
                onError={setErrorMessage}
                toolbarOptions={toolbarOptions}
                onRowClick={rowClick}
            />
        </div>
    );
};

ReactDOM.render(<LocalDataGrid />, document.getElementById('root'));
```

This is a preview of the previous code:

![Local](https://user-images.githubusercontent.com/36867256/85425715-24038900-b53f-11ea-9248-e03ca1c43d8a.gif)

[![Edit LocalDataGrid -Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/localdatagrid-example-9gzvh?fontsize=14&hidenavigation=1&theme=dark)

### Using a Grid
In addition to lists, it is also possible to display the data on a grid.

```js


ReactDOM.render(<RemoteDataGrid />, document.getElementById('root'));
```

This is a preview of the previous code:

![Grid](https://user-images.githubusercontent.com/36867256/85425888-6331da00-b53f-11ea-9359-88f83689da3a.gif)

### Using a Master Detail Row
When it is necessary to show additional information in each record you can use Master Detail Row.

```js
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { formatDate, LocalStorage } from 'tubular-common';
import { Paginator, SearchTextInput } from '../../src';
import CustomHttpClient from './CustomHttpClient';
import columns from './data/columns';
import { useTbTable } from 'tubular-react-common';

const styles: any = {
    progress: {
        height: '20px',
    },
    search: {
        margin: '15px 10px 10px 10px',
        textAlign: 'right',
    },
};

const RemoteGridList: React.FunctionComponent = () => {
    const [getErrorMessage, setErrorMessage] = React.useState(null as string);

    const tbTableInstance = useTbTable(columns, 'https://tubular.azurewebsites.net/api/orders/paged', {
        storage: new LocalStorage(),
        componentName: 'RemoteGridList',
    });

    console.log(tbTableInstance);
    return (
        <Paper>
            <div style={styles.search}>
                <SearchTextInput
                    searchText={tbTableInstance.state.searchText}
                    updateSearchText={tbTableInstance.api.updateSearchText}
                />
            </div>
            <div style={styles.progress}>{tbTableInstance.state.isLoading && <LinearProgress />}</div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <GridList cellHeight={180} cols={5}>
                                {tbTableInstance.state.data &&
                                    tbTableInstance.state.data.map(row => (
                                        <GridListTile key={row.OrderID}>
                                            <Card>
                                                <CardContent>
                                                    <Typography gutterBottom={true} variant="h5" component="h2">
                                                        {row.OrderID} - {row.CustomerName}
                                                    </Typography>
                                                    <Typography component="p">{row.ShipperCity}</Typography>
                                                    <Typography component="p">
                                                        {formatDate(row.ShippedDate, 'M/d/yyyy h:mm a')}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" color="primary">
                                                        Learn More
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </GridListTile>
                                    ))}
                            </GridList>
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <Paginator tbTableInstance={tbTableInstance} />
                    </TableRow>
                </TableFooter>
            </Table>
        </Paper>
    );
};

ReactDOM.render(<RemoteGridList />, document.getElementById('root'));
```

This is a preview of the previous code:

![MasterDetail](https://user-images.githubusercontent.com/36867256/85426338-f408b580-b53f-11ea-8045-f2aedb90a33f.gif)

[![Edit RemoteDataGrid -Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/remotedatagrid-example-5sis8?fontsize=14&hidenavigation=1&theme=dark)

## i18n Support

Tubular React now includes a brand new Language Service that will translate the content of the grid to a preferred language.
Devs can also implement content on their language and import it to use this language.
By default, Tubular React comes with implementations in **English** and **Spanish**.
If any key content needs parameters to include in the translation, devs can pass the parameters in the `translate` function.

```ts
import { Lang } from 'tubular-react';

Lang.translate('PageNum', 16);
// => 'Page 16'
```

## Related Projects

| Name                                                                                                 | Type            | Language/tech         | Description                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------- | --------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Tubular for AngularJS (formerly Tubular)](https://github.com/unosquare/tubular)                     | Library         | AngularJs             | Tubular provides a set of directives and services using AngularJS as framework.                                                                                                   |
| [Tubular for Angular6 (formerly Tubular2)](https://github.com/unosquare/tubular2)                    | Library         | Angular6              | New Tubular2 with Angular6 (Angular2) and Angular Material 2.                                                                                                                     |
| [Tubular React](https://github.com/unosquare/tubular-react)                                          | Library         | React                 | Tubular-React is a DataGrid component using Material-UI                                                                                                                           |
| [Tubular Common](https://github.com/unosquare/tubular-common)                                        | Library         | Javascript/Typescript | Tubular Common provides TypeScript and Javascript models and data transformer to use any Tubular DataGrid component with an array of Javascript objects.                          |
| [Tubular Dotnet](https://github.com/unosquare/tubular-dotnet)                                        | Backend library | C#/.NET Core          | Tubular provides .NET Framework and .NET Core Library to create REST service to use with Tubular Angular Components easily with any WebApi library (ASP.NET Web API for example). |
| [Tubular Nodejs](https://github.com/unosquare/tubular-nodejs)                                        | Backend Library | Javascript            | Tubular Node.js provides an easy way to integrate Tubular Angular Components easily with any Node.js WebApi library.                                                              |
| [Tubular Boilerplate C#](https://github.com/unosquare/tubular-boilerplate-csharp)                    | Boilerplate     | C#                    | Tubular Directives Boilerplate (includes AngularJS and Bootstrap)                                                                                                                 |
| [Tubular Boilerplate](https://github.com/unosquare/tubular-boilerplate)                              | Boilerplate     | Javascript/AngularJS  | Tubular Directives Boilerplate (includes AngularJS and Bootstrap).                                                                                                                |
| [Tubular ASP.NET Core 2.0 Boilerplate](https://github.com/unosquare/tubular-aspnet-core-boilerplate) | Boilerplate     | C#/.NET Core          | Tubular Directives Boilerplate (includes AngularJS and Bootstrap).                                                                                                                |
