import Grid from '../../src/Grid/Grid';
import React from 'react';

export default class Main extends React.Component{
  render(){
    return(
      <Grid data={[{ key: 'data' }]} columns={[{ key: 'key', label: 'label', sortable: true }]}/>
    );
  }
}