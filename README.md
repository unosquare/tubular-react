 [![Analytics](https://ga-beacon.appspot.com/UA-8535255-2/unosquare/tubular-react/)](https://github.com/igrigorik/ga-beacon)
 [![npm version](https://badge.fury.io/js/tubular-react.svg)](https://badge.fury.io/js/tubular-react)
 [![Build Status](https://travis-ci.org/unosquare/tubular-react.svg?branch=master)](https://travis-ci.org/unosquare/tubular-react)
 [![Build status](https://ci.appveyor.com/api/projects/status/xokpdjvlh4djwvri/branch/master?svg=true)](https://ci.appveyor.com/project/geoperez/tubular-react/branch/master)
 [![Coverage Status](https://coveralls.io/repos/github/unosquare/tubular-react/badge.svg?branch=master)](https://coveralls.io/github/unosquare/tubular-react?branch=master)

 ![Tubular-React](http://unosquare.github.io/tubular/assets/tubular.png)

:star: *Please star this project if you find it useful!*

**Tubular-React** is a [Material-UI](https://material-ui.com/) table with local or remote data-source. Featuring:

* Define a custom layout for columns and cells using `render` methods.
* Use a remote or local datasource. Remote datasource use a specific Request and Response format.
* Sort and filter multiple columns.
* Free-text search of string columns.
* Page data. Remote data is paged in the server side.
* Export data to a CSV file.
* Print data.

Check the documentation and samples in [Tubular React website](https://unosquare.github.io/tubular-react). Or you can try a [CodeSandbox demo](https://codesandbox.io/s/818mwv72ll).

Please visit the [Tubular GitHub Page](http://unosquare.github.io/tubular) to learn how quickly you can start coding. See [Related projects](#related-projects) below to discover more Tubular libraries and backend solutions.

Table of contents
=================

  * [Dependencies](#dependencies)  
  * [💾Installation](#installation)
  * [Usages](#datagrid)
    * [DataGrid](#datagrid)
    * [Using a remote data source](#using-a-remote-data-source)
    * [Using a local data source](#using-a-local-data-source)
    * [DataGrid Props](#datagrid-props)
    * [DataGridTable Props](#datagridtable-props)
    * [ToolbarOptions](#toolbaroptions-class)
    * [ColumnModel](#columnmodel)
  * [Examples](#examples)
    * [How to include functionality buttons](#how-to-include-functionality-buttons)
    * [Run integrated sample](#run-integrated-sample)
  * [Related projects](#related-projects)

## Dependencies

* [date-fns](https://date-fns.org/) - Version: 1.30.1
* [Material UI Core](https://material-ui.com/) - Version: 4.2.0
* [React](https://reactjs.org/) - Version: >16.8
* [Tubular Common](https://github.com/unosquare/tubular-common) - Version: 1.4.1.
* [uno-react](https://github.com/unosquare/uno-react) - Version: 0.7.5.
* [uno-material-ui](https://github.com/unosquare/uno-material-ui) - Version: 1.2.4.
* [JSS](https://cssinjs.org/?v=v10.0.0-alpha.23) - Version: 10.0.0-alpha.10.

## Installation

```sh
$ npm install tubular-react --save
```

### `DataGrid`

You can start using `DataGrid` with this sample code. The grid will connect to a remote datasource or have a local datasource depending on what it's passed in the dataSource property.

```js
import React from "react";
import ReactDOM from "react-dom";

import { DataGrid } from "tubular-react";
import { ColumnModel } from 'tubular-common';

const columns = [
  new ColumnModel("OrderID"),
  new ColumnModel("CustomerName"),
  new ColumnModel("ShipperCity")
];

const SampleGrid = () => (
  <DataGrid
    columns={columns}
    dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
    gridName='Grid'
   />
);

ReactDOM.render(<SampleGrid />, document.getElementById("root"));
```

This is a preview of the previous code:

![DataGrid](https://user-images.githubusercontent.com/25437790/57318742-a7a2b200-70c0-11e9-8d5b-aaf2107bd059.gif)

### Using a remote data source

You will need both a URL and a `ColumnModel` array.

```js
<DataGrid
    columns={columns}
    dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
    gridName='Grid'
/>
```

### Using a local data source

You will need both an array of data objects and a `ColumnModel` array. See this [example](https://github.com/unosquare/tubular-react/blob/master/sample/src/data/localData.ts) of how to define the array of objects.

```js
<DataGrid
    columns={columns}
    dataSource={localData}
    gridName='Grid'
/>
```

### `DataGrid` props

These are all the available props (and their default values) for the `<DataGrid />` component.

| Name | Type | Default Value | Description |
|------|------|---------------|-------------|
| `bodyRenderer`    | `function`        | -         | `Optional`. It takes a function with 4 parameters `(row: any, index: number, columns: ColumnModel[], onRowClickProxy: (ev: any) => any)` to map all rows. |
| `columns`  | `ColumnModel[]`        | -         |Use this prop to set the grid columns. |
| `dataSource`  | `Url or Array[]`        | -         |Use this prop to set the data. |
| `footerRenderer`  | `function`        | -         | `Optional`. It takes an aggregate function with 1 parameter `(aggregate: any)` to show in a foot row the results from the aggregate function. |
| `gridName`        | `string`          | `Grid`    | `Optional` This will be the grid identifier and the title at printing or exporting. |
| `onError`  | `string`        | -         | `Optional`. Use this prop to set the error message. |
| `onRowClick`  | `function`        | -         | `Optional`. Use this event handler to receive the clicked row. |
| `toolbarOptions`  | `ToolbarOptions`  | `new ToolBarOptions()`  | `Optional`. It should be an instance of `ToolbarOptions`. This encapsulates useful options. |                                                |
| `storage`  | `IDataGridStorage`        | `LocalStorage`         | `Optional`. Use this prop to set the settings storage. |


### `DataGridTable` props

These are all the available props (and their default values) for the `<DataGridProvider />` component.

| Name | Type | Default Value | Description |
|------|------|---------------|-------------|
| `bodyRenderer`    | `function`        | -         | `Optional`. It takes a function with 4 parameters `(row: any, index: number, columns: ColumnModel[], onRowClickProxy: (ev: any) => any)` to map all rows. |
| `footerRenderer`  | `function`        | -         | `Optional`. It takes an aggregate function with 1 parameter `(aggregate: any)` to show in a foot row the results from the aggregate function. |
| `onRowClick`  | `function`        | -         | `Optional`. Use this event handler to receive the clicked row. |


### `ToolbarOptions` class

These are all the available properties (and their default values) for the `ToolbarOptions` class.

| Name | Type | Default Value | Description |
|------|------|---------------|-------------|
| `advancePagination`   | `bool`      | `true`              | `Optional`. It shows advanced pagination with numbers of the page to navigate between pages, also display the navigation buttons to the last or first page. Otherwise, show a simple pagination with two directions arrows for advance or go back a page. |
| `bottomPager`         | `bool`      | `true`              | `Optional`. It shows pagination bar in the bottom of the grid. |
| `exportButton`        | `bool`      | `true`              | `Optional`. It shows the export button. |
| `itemsPerPage`         | `number`    | 10                  | `Optional`. Initial value that represents the number of rows per page. It should be a number that is inside the `rowsPerPageOptions` array. |
| `searchText`          | `bool`      | `true`              | `Optional`. It shows the search text input. |
| `topPager`            | `bool`      | `true`              | `Optional`. It shows pagination bar in the top of the grid. |
| `printButton`         | `bool`      | `true`              | `Optional`. It shows the print button. |
| `rowsPerPageOptions`  | `array`     | [10, 20, 50, 100]   | `Optional`. It shows a combo with a set of values that represent the number of rows per page. |

_If you don't define some of the optional props described above, these will use their defaults values. In the case of `bodyRenderer`, the grid will display its default body; if the `footerRenderer` is not defined, the footer will not be displayed._

### `ColumnModel`

It represents a `DataGrid` column and its constructor requires a name identifier as well as an object of column options with the following properties:

| Name | Type | Default Value | Description | Options   |
|---------------|-------------------|-------------------------|--------------------------------------------------------------|----------|
| `Name`          | `string`              |         `NONE`          | This is required and represents a property of the entity which we are binding. |-|
| `Aggregate`     | `AggregateFunctions`  |         `NONE`          | The aggregation function that will be applied to this column. | `NONE`, `SUM`, `AVERAGE`, `COUNT`, `DISTINCT_COUNT`, `MAX`, `MIN` |
| `DataType`      | `ColumnDataType`      |       `STRING`          | The column type. | `STRING`, `NUMERIC`, `BOOLEAN`, `DATE`, `DATE_TIME`, `DATE_TIME_UTC` |
| `Filterable`        | `bool`                |        `false`          | Enables Filterable.|-|
| `IsKey`         | `bool`                |        `false`          | Defines if a column is an identifier or not. |-|
| `Label`         | `string`              | The name of the column  | Column label that will be shown. |-|
| `Searchable`    | `bool`                |        `true`           | Indicates that a column can be used to search upon. |-|
| `SortDirection` |`ColumnSortDirection`  |        `NONE`           |-| `NONE`, `ASCENDING`, `DESCENDING` |
| `SortOrder`     | `number`              |         `-1`            |-|-|
| `Sortable`      | `bool`                |        `false`          | Determines if a column can be sorted. |-|
| `Visible`       | `bool`                |        `true`           | Specifies if a column should be shown. |-|

## Examples

### How to include functionality buttons

You can add functionalities to the `DataGridProvider` including extra buttons that can perform an action according to your requirements. Just need include an IconButton Component from @material-ui and define the icon or button that you need between `DataGridProvider` tags and specify the action to perform.

The following snippet shows how to include an Add Button:

```tsx
import * as React from "react";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { DataGrid } from "tubular-react";

const LocalDataGrid = () => (
<DataGrid
    columns={columns}
    dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
    gridName='Grid'
>
   <IconButton color='default' onClick={() => alert('I can help you to add features to your datagrid.')}>
       <AddIcon />
   </IconButton>
</DataGrid>
);
```

### Run integrated sample

There is a sample included in this project, you can run it just by doing the following.

```shell
// Install all the dependencies
npm install
// Run the sample project
npm start
```

## Related Projects

Name | Type | Language/tech | Description
-----|------|---------------|--------------
| [Tubular for AngularJS (formerly Tubular)](https://github.com/unosquare/tubular) | Library | AngularJs | Tubular provides a set of directives and services using AngularJS as framework. |
| [Tubular for Angular6 (formerly Tubular2)](https://github.com/unosquare/tubular2) | Library | Angular6 | New Tubular2 with Angular6 (Angular2) and Angular Material 2.
| [Tubular React](https://github.com/unosquare/tubular-react) | Library | React | Tubular-React is a DataGrid component using Material-UI |
| [Tubular Common](https://github.com/unosquare/tubular-common) | Library | Javascript/Typescript | Tubular Common provides TypeScript and Javascript models and data transformer to use any Tubular DataGrid component with an array of Javascript objects. |
| [Tubular Dotnet](https://github.com/unosquare/tubular-dotnet) | Backend library | C#/.NET Core | Tubular provides .NET Framework and .NET Core Library to create REST service to use with Tubular Angular Components easily with any WebApi library (ASP.NET Web API for example). |
| [Tubular Nodejs](https://github.com/unosquare/tubular-nodejs) | Backend Library | Javascript | Tubular Node.js provides an easy way to integrate Tubular Angular Components easily with any Node.js WebApi library. |
| [Tubular Boilerplate C#](https://github.com/unosquare/tubular-boilerplate-csharp) | Boilerplate | C# | Tubular Directives Boilerplate (includes AngularJS and Bootstrap) |
| [Tubular Boilerplate](https://github.com/unosquare/tubular-boilerplate) | Boilerplate | Javascript/AngularJS | Tubular Directives Boilerplate (includes AngularJS and Bootstrap). |
| [Tubular ASP.NET Core 2.0 Boilerplate](https://github.com/unosquare/tubular-aspnet-core-boilerplate) | Boilerplate | C#/.NET Core | Tubular Directives Boilerplate (includes AngularJS and Bootstrap). |
