 [![Analytics](https://ga-beacon.appspot.com/UA-8535255-2/unosquare/tubular-react/)](https://github.com/igrigorik/ga-beacon)
 [![npm version](https://badge.fury.io/js/tubular-react.svg)](https://badge.fury.io/js/tubular-react)
 [![Build Status](https://travis-ci.org/unosquare/tubular-react.svg?branch=master)](https://travis-ci.org/unosquare/tubular-react)
 [![Coverage Status](https://coveralls.io/repos/github/unosquare/tubular-react/badge.svg?branch=master)](https://coveralls.io/github/unosquare/tubular-react?branch=master)
 
 ![Tubular-React](http://unosquare.github.io/tubular/assets/tubular.png)
 
:star: *Please star this project if you find it useful!*

**Tubular-react** is a set of components that uses [MaterialUI](https://material-ui-next.com/). 

Developing with .NET as backend? check [Tubular DotNet](https://github.com/unosquare/tubular-dotnet) project.

Developing with Node.js as backend? check [Tubular Node.js](https://github.com/unosquare/tubular-nodejs) project.

Do you want to use AngularJS? check out [Tubular](https://github.com/unosquare/tubular)

If you are looking for Angular2 components, check [Tubular2](https://github.com/unosquare/tubular2) beta project.

Please visit the [Tubular GitHub Page](http://unosquare.github.io/tubular) to learn how quickly you can start coding. Don't forget to check out the Tubular Generator which quickly turns models into an awesome UIs!

## Dependencies
* [Material-UI](https://material-ui-next.com/) - Next

## npm Installation 
```
$ npm install tubular-react --save
```
## Using the *`<DataGrid/>`* component
```js
import DataGrid, {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection,
  RemoteDataSource
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
  )
];

class CustomComponent extends React.Component {
state={
dataSource: new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns)
}

  render() {
    const { dataSource } = this.state; 

    return (
      <DataGrid dataSource={dataSource} rowsPerPage = { 10 } gridName = 'table' />
    );
  }
}

```

Using a custom body and footer renderer
```js
<DataGrid dataSource={ dataSource } 
        gridName = 'table'
        bodyRenderer = {
          (row, index) => 
            <TableRow hover key = { index }>
              <TableCell padding = { 'default' }>
                { row.OrderID }
              </TableCell>
              <TableCell padding = { 'default' }>
                { row.CustomerName }
              </TableCell>
            </TableRow>
        } 
        rowsPerPage = { 10 } 
        footerRenderer = {
          aggregates => 
            <TableRow>
              <TableCell>Total: </TableCell>
              <TableCell> { aggregates && aggregates.CustomerName } </TableCell>
            </TableRow>
        }
      />
```

### Props 
These are all the available props (and their default values) for the `<DataGrid />` component.

| Name           | Type                                   | Default   | Description                                  |
|----------------|----------------------------------------|-----------|----------------------------------------------|
| datasource     | `RemoteDataSource` or `LocalDataSource`|           |    **Required**                              |
| gridName       | `string`                               | ''        |                                              |      
| rowsPerPage    | `number`                               |     10    |                                              |
| showBottomPager| `bool`                                 | `false`   |                                              |
| showTopPager   | `bool`                                 |` false`   |                                              |
| showPrintButton| `bool`                                 | `false`   |                                              |
|showExportButton| `bool`                                 | `false`   |                                              |
| bodyRenderer   | `function`                             |           |                                              |
| footerRenderer | `function`                             |           |                                              |


### `DataSource`
`<DataGrid/>` requires a dataSource prop which is an instance of the `RemoteDataSource` class, that deals with data retrieval among other things. At the same time, `RemoteDataSource` needs both a URL and a `ColumnModel` array.

### `ColumnModel` 
It represents a `DataGrid` column and its constructor requires an identifier as well as an object of column options with these properties and default values:

| Name          | Type             | Default           | Description                                  |
|---------------|------------------|-------------------|----------------------------------------------|
| Aggregate     |AggregateFunctions|     NONE          | The aggregation function that will be applied to this column|
| DataType      | ColumnDataType   |       STRING      |        the column type                       |
| Filtering     | bool             | false             |        activates filtering                   |
| IsKey         | bool             |  false            |   defines if a column is an identifier or not|
| Label         | string           |                   |     column label that will be shown          |
| Searchable    | bool             |     true          |indicates that a column can be used to search upon|
| SortDirection |ColumnSortDirection|       NONE       |                                              |
| SortOrder     | number           |                   |                                              |
| Sortable      | bool             |                   |   determines if a column can be sorted       |
| Visible       | bool             |     true          |  specifies if a column should be shown       |


## Run integrated sample

There is a sample included in this project, you can run it just by doing the following.

```
// Install all the dependencies
npm install
// Run the sample project
npm start
```
