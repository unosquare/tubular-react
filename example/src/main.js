import Grid from '../../src/Grid/Grid';
import React from 'react';

const columns = [
  { 
    name: 'userId', 
    label: 'User ID', 
    sortable: true,
    sortDirection: 'none',
    searchable: true,
    visible: true,
    isKey: false,
    dataType: 'string'
  },
  { 
    name: 'id', 
    label: 'ID', 
    sortable: true,
    sortDirection: 'none',
    searchable: true,
    visible: true,
    isKey: false,
    dataType: 'string'
  },
  { 
    name: 'title', 
    label: 'Title', 
    sortable: true,
    sortDirection: 'none',
    searchable: true,
    visible: true,
    isKey: false,
    dataType: 'string'
  },
  { 
    name: 'body', 
    label: 'Body', 
    sortable: true,
    sortDirection: 'none',
    searchable: true,
    visible: true,
    isKey: false,
    dataType: 'string'
  }
];
export default class Main extends React.Component{
  render(){
    return(
      <Grid data={[{ key: 'data' }]} columns={columns} serverUrl = { 'https://jsonplaceholder.typicode.com/posts' } />
      // <Grid columns={columns} serverUrl = { 'https://jsonplaceholder.typicode.com/posts' } />
    );
  }
}