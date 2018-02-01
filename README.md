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
* [Material-ui](https://material-ui-next.com/) - Next
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
    'Label': 'Order ID',
    'Name': 'OrderID',
    'Sortable': true,
    'SortOrder': 1,
    'SortDirection': 'Ascending',
    'IsKey': true,
    'Searchable': false,
    'Visible': true,
    'Filter': { 
      Argument: [],
      HasFilter: false,
      Name: 'OrderID',
      Operator: 'None',
      OptionsUrl: null,
      Text: null
    },
    'DataType': 'numeric',
    'Aggregate': 'None'
  },
  {
    'Label': 'Customer Name',
    'Name': 'CustomerName',
    'Sortable': true,
    'SortOrder': -1,
    'SortDirection': 'None',
    'IsKey': false,
    'Searchable': true,
    'Visible': true,
    'Filter': { 
      Argument: [],
      HasFilter: false,
      Name: 'CustomerName',
      Operator: 'None',
      OptionsUrl: null,
      Text: null
    },
    'DataType': 'string',
    'Aggregate': 'Count'
  }
];

class CustomComponent extends React.Component {
  render() {
    const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns);

    return (
      <Grid dataSource={dataSource} rowsPerPage = { 25 } />
    );
  }
}

```

### Props 
These are all the available props (and their default values) for the `<Grid />` component.
```js
{
  bodyRenderer: undefined,
  dataSource: undefined,
  footerRenderer: undefined,  
  page: 0,
  rowsPerpage: 5,
  title: '',
  showPrintButton: false
}

```

### DataSource

## Run integrated sample

There is a sample included in this project, you can run it just by doing the following.

```
// Install all the dependencies
npm install
// Runs the sample project
npm start
```
