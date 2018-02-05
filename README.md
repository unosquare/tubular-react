  [![Analytics](https://ga-beacon.appspot.com/UA-8535255-2/unosquare/tubular-react/)](https://github.com/igrigorik/ga-beacon)
 [![Build Status](https://travis-ci.org/unosquare/tubular-react.svg?branch=master)](https://travis-ci.org/unosquare/tubular-react)
 
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
import Grid, { RemoteDataSource } from 'tubular-react';
import React from 'react';

const columns = [
   {
    Label: 'Order ID',
    Name: 'OrderID',
    Sortable: true,
    SortOrder: 1,
    SortDirection: 'Ascending',
    IsKey: true,
    Searchable: false,
    DataType: 'numeric',
  },
  {
    Label: 'Customer Name',
    Name: 'CustomerName',
    IsKey: false,
    Filtering: true,
    Aggregate: 'Count'
  }
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

### DataSource
`<Grid/>` requires a dataSource prop which is an instance of the `RemoteDataSource` class, that deals with data retrieval among other things. At the same time, `RemoteDataSource` needs both a URL and a columns variable in its constructor. The expected `column` structure (and the default values) is the following:

```js
{
  Name: undefined, // required
  Label: undefined, //required
  Sortable: false,
  SortOrder: undefined, //required only if Sortable is true
  SortDirection: undefined, //required only if Sortable is true
  Searchable: true,
  Visible: true,
  IsKey: false,
  DataType: 'string',
  Filtering: false
}
```


## Run integrated sample

There is a sample included in this project, you can run it just by doing the following.

```
// Install all the dependencies
npm install
// Runs the sample project
npm start
```
