import Grid from '../../src/Grid/Grid';
import React from 'react';

const columns = [
  { 
    name: 'key', 
    label: 'label', 
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
      <Grid data={[{ key: 'data' }]} columns={columns}/>
    );
  }
}