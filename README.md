  [![Analytics](https://ga-beacon.appspot.com/UA-8535255-2/unosquare/tubular-react/)](https://github.com/igrigorik/ga-beacon)
 [![Build Status](https://travis-ci.org/unosquare/tubular-react.svg?branch=master)](https://travis-ci.org/unosquare/tubular-react)
 [![Coverage Status](https://coveralls.io/repos/github/unosquare/tubular-react/badge.svg?branch=Issue78-AddAppVeyor)](https://coveralls.io/github/unosquare/tubular-react?branch=Issue78-AddAppVeyor)
 
 ![Tubular](http://unosquare.github.io/tubular/assets/tubular.png)
 
:star: *Please star this project if you find it useful!*

**Tubular-react** is a set of components that uses [MaterialUI Next](https://material-ui-next.com/). 

Developing with .NET as backend? check [Tubular DotNet](https://github.com/unosquare/tubular-dotnet) project.

Developing with Node.js as backend? check [Tubular Node.js](https://github.com/unosquare/tubular-nodejs) project.

Do you want to use AngularJS? check out [Tubular](https://github.com/unosquare/tubular)

If you are looking for Angular2 components, check [Tubular2](https://github.com/unosquare/tubular2) beta project.

Please visit the <a href="http://unosquare.github.io/tubular" target="_blank">Tubular GitHub Page</a> to learn how quickly you can start coding. Don't forget to check out the Tubular Generator which quickly turns models into an awesome UIs!

## Dependencies
* [React](https://reactjs.org/) - 15.x or 16.x
* [Material-UI](https://material-ui-next.com/) - Next
* [ReactDOM](https://reactjs.org/docs/react-dom.html) - 15.x or 16.x

## npm Installation 
```
$ npm install tubular-react --save
```
## Example
```js
import Grid, {
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
      <Grid dataSource={dataSource} rowsPerPage = { 10 } gridName = 'table' />
    );
  }
}

```

Using a custom body and footer renderer
```js
<Grid dataSource={ dataSource } 
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
These are all the available props (and their default values) for the `<Grid />` component.
```js
{
  bodyRenderer: undefined,
  dataSource: undefined, //required
  footerRenderer: undefined,  
  gridName: undefined, // required
  rowsPerpage: 10,
  showPrintButton: false,
  showExportButton: false,
  showTopPager: false,
  showBottomPager: false,
}

```

### `DataSource`
`<Grid/>` requires a dataSource prop which is an instance of the `RemoteDataSource` class, that deals with data retrieval among other things. At the same time, `RemoteDataSource` needs both a URL and a `ColumnModel` array.

### `ColumnModel` 
It represents a `Grid` column and its constructor requires an identifier as well as an object of column options with these properties and default values:
```js
{
    Aggregate: AggregateFunctions.NONE,
    DataType: ColumnDataType.STRING,
    Filtering: false,
    IsKey: boolean,
    Label: string,
    Searchable: false,
    SortDirection: ColumnSortDirection.NONE,
    SortOrder: number,
    Sortable: false,
    Visible: true,
}
```

### AggregateFunctions

```js
{
  NONE,
  SUM,
  AVERAGE,
  COUNT,
  DISTINCT_COUNT,
  MAX,
  MIN
}
```
### ColumnDataType

```js
{
    STRING,
    NUMERIC,
    BOOLEAN,
    DATE,
    DATE_TIME,
    DATE_TIME_UTC
}
```

### ColumnSortDirection

```js
{
    NONE,
    ASCENDING,
    DESCENDING
}
```
## Run integrated sample

There is a sample included in this project, you can run it just by doing the following.

```
// Install all the dependencies
npm install
// Run the sample project
npm start
```
