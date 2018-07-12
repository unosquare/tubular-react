 [![Analytics](https://ga-beacon.appspot.com/UA-8535255-2/unosquare/tubular-react/)](https://github.com/igrigorik/ga-beacon)
 [![npm version](https://badge.fury.io/js/tubular-react.svg)](https://badge.fury.io/js/tubular-react)
 [![Build Status](https://travis-ci.org/unosquare/tubular-react.svg?branch=master)](https://travis-ci.org/unosquare/tubular-react)
 [![Build status](https://ci.appveyor.com/api/projects/status/xokpdjvlh4djwvri/branch/master?svg=true)](https://ci.appveyor.com/project/geoperez/tubular-react/branch/master)
 [![Coverage Status](https://coveralls.io/repos/github/unosquare/tubular-react/badge.svg?branch=master)](https://coveralls.io/github/unosquare/tubular-react?branch=master)

 ![Tubular-React](http://unosquare.github.io/tubular/assets/tubular.png)

:star: *Please star this project if you find it useful!*

**Tubular-React** is a DataGrid component using [Material-UI](https://material-ui.com/). The DataGrid component can display tabular data including the following features:

* Define a custom layout for columns and cells using `render` methods.
* Use a remote or local datasource. Remote datasource use a specific Request and Response format.
* Sort and filter multiple columns.
* Free-text search of string columns.
* Page data. Remote data is paged in the server side.
* Export data to a CSV file.
* Print data.

Check the documentation and samples in [Tubular React website](https://unosquare.github.io/tubular-react). Or you can try a [CodeSandbox demo](https://codesandbox.io/s/64jwr7mx8r).

For more information how to implement a remote datasource, check [Tubular DotNet](https://github.com/unosquare/tubular-dotnet) project or [Tubular Node.js](https://github.com/unosquare/tubular-nodejs) project. Depending in your backend.

Similar components are available in [Angular.js flavor](https://github.com/unosquare/tubular) and [Angular2](https://github.com/unosquare/tubular2).

## Dependencies

* [Material UI Core](https://material-ui.com/) - Version: 1.2.0.

## npm Installation

```
$ npm install tubular-react --save
```

## Using the `<DataGrid />` component

You can start using `DataGrid` with this sample code. The grid will connect to a remote datasource or have a local datasource depending of how you export your class. The available exports that you can use are [`withRemoteDataSource`](#export-withRemoteDataSource) and [`withLocalDataSource`](##export-withLocalDataSource).

**Make sure you add the export**

```js
import DataGrid, {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection,
  ToolbarOptions
} from 'tubular-react';
import React from 'react';

const columns = [
  new ColumnModel( 'OrderID',
    { DataType: ColumnDataType.NUMERIC,
      Filtering: true,
      IsKey: true,
      Label: 'ID',
      SortDirection: ColumnSortDirection.ASCENDING,
      SortOrder: 1,
      Sortable: true }
  ),
  new ColumnModel( 'CustomerName',
    { Aggregate: AggregateFunctions.COUNT,
      Filtering: true,
      Searchable: true,
      Sortable: true }
  ),
  new ColumnModel( 'ShipperCity' )
];

class CustomComponent extends React.Component {

  render() {
    return (
        <DataGrid
          gridName='Tubular-React'
        />
    );
  }
}

// export default use withLocalDataSource or withRemoteDataSource
```

The following snippet shows how to use a custom body and a custom footer:

```jsx
render() {
  <DataGrid
          gridName='table'
          bodyRenderer={
            (row: any, index: any) =>
              <TableRow hover={true} key={index}>
                <TableCell padding={'default'}>
                  {row.OrderID}
                </TableCell>
                <TableCell padding={'default'}>
                  {row.CustomerName}
                </TableCell>
                <TableCell padding={'default'}>
                  {row.ShipperCity}
                </TableCell>
              </TableRow>
          }
          footerRenderer={
            (aggregates: any) =>
              <TableRow>
                <TableCell>Total: </TableCell>
                <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
              </TableRow>
          }
  />
}

// export default use withLocalDataSource or withRemoteDataSource
```

### Export `withRemoteDataSource`
Exporting your `DataGrid` using `withRemoteDataSource` HOC will need both a URL and a `ColumnModel` array.

```js
export default withRemoteDataSource(CustomComponent, columns, 'http://tubular.azurewebsites.net/api/orders/paged');
```

### Export `withLocalDataSource`
Exporting your `DataGrid` using `withLocalDataSource` HOC will need both an array of data objects and a `ColumnModel` array. See this [example](https://github.com/unosquare/tubular-react/blob/master/sample/src/local/localData.ts) of how to define the array of objects.

```js
export default withLocalDataSource(LocalDataGrid, columns, localData);
```

**And you can use it like your name you component `<CustomComponent />`**

### `DataGrid` props

These are all the available props (and their default values) for the `<DataGrid />` component.

| Name | Type | Default Value | Description |
|------------------|----------------------------------------|-----------------|----------------------------------------------|
| `gridName`        | `string`          | -         | - |
| `toolbarOptions`  | `ToolbarOptions`  | defaults  | It should be an instance of ToolbarOptions |                                                |
| `bodyRenderer`    | `function`        | -         | - |
| `footerRenderer`  | `function`        | -         | - |

### `ToolbarOptions` class

These are all the available properties (and their default values) for the `ToolbarOptions` class.

| Name | Type | Default Value | Description |
|------------------|----------------------------------------|-----------------|----------------------------------------------|
| `itemsPerPage`         | `number`    | 10                  | It should be a number that is inside the `rowsPerPageOptions` array.|
|`rowsPerPageOptions`   | `array`     | [10, 20, 50, 100]   | The options that are going to be shown in the `Page size` dropdown.|
| `bottomPager`         | `bool`      | `true`              | - |
| `exportButton`        | `bool`      | `true`              | - |
| `searchText`          | `bool`      | `true`              | - |
| `topPager`            | `bool`      | `true`              | - |
| `printButton`         | `bool`      | `true`              | - |

_If you don't define some of the optional props described above, these will use their defaults values. In the case of `bodyRenderer`, the grid will display its default body; if the `footerRenderer` is not defined, the footer will not be displayed._

### `ColumnModel` 
It represents a `DataGrid` column and its constructor requires a name identifier as well as an object of column options with the following properties:

| Name | Type | Default Value | Description | Options   |
|---------------|-------------------|-------------------------|--------------------------------------------------------------|----------|
| `Aggregate`     | `AggregateFunctions`  |         `NONE`          | The aggregation function that will be applied to this column. | `NONE`, `SUM`, `AVERAGE`, `COUNT`, `DISTINCT_COUNT`, `MAX`, `MIN` |
| `DataType`      | `ColumnDataType`      |       `STRING`          | The column type. | `STRING`, `NUMERIC`, `BOOLEAN`, `DATE`, `DATE_TIME`, `DATE_TIME_UTC` |
| `Filter`        | `bool`                |        `false`          | Enables filtering.|-|
| `IsKey`         | `bool`                |        `false`          | Defines if a column is an identifier or not. |-|
| `Label`         | `string`              | The name of the column  | Column label that will be shown. |-|
| `Searchable`    | `bool`                |        `true`           | Indicates that a column can be used to search upon. |-|
| `SortDirection` |`ColumnSortDirection`  |        `NONE`           |-| `NONE`, `ASCENDING`, `DESCENDING` |
| `SortOrder`     | `number`              |         `-1`            |-|-|
| `Sortable`      | `bool`                |        `false`          | Determines if a column can be sorted. |-|
| `Visible`       | `bool`                |        `true`           | Specifies if a column should be shown. |-|

## Run integrated sample

There is a sample included in this project, you can run it just by doing the following.

```shell
// Install all the dependencies
npm install
// Run the sample project
npm start
```
