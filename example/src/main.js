import Grid from '../../src/Grid/Grid';
import React from 'react';

let id = 0;
function createData(name, calories, fat, carbs, protein, date) {
  id += 1;
  return { id, name, calories, fat, carbs, protein, date };
}

export default class Main extends React.Component{
  state = {
    data: [
      createData('Cupcake', 305, 3.7, 67, 4.3, new Date('2016-02-01T18:00:00').toString()),
      createData('Donut', 452, 25.0, 51, 4.9, new Date('2015-12-05T18:00:00').toString()),
      createData('Eclair', 262, 16.0, 24, 6.0, new Date('2016-01-30T18:00:00').toString()),
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0, new Date('2016-04-03T18:00:00').toString()),
      createData('Gingerbread', 356, 16.0, 49, 3.9, new Date('2016-11-05T18:00:00').toString()),
      createData('Honeycomb', 408, 3.2, 87, 6.5, new Date('2017-07-01T18:00:00').toString()),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3, new Date('2013-10-02T18:00:00').toString()),
      createData('Jelly Bean', 375, 0.0, 94, 0.0, new Date('2017-10-15T18:00:00').toString()),
      createData('KitKat', 518, 26.0, 65, 7.0, new Date('2014-08-22T18:00:00').toString()),
      createData('Lollipop', 392, 0.2, 98, 0.0, new Date('2011-02-26T17:00:00').toString()),
      createData('Marshmallow', 318, 0, 81, 2.0, new Date('2011-02-26T18:00:00').toString()),
      createData('Nougat', 360, 19.0, 9, 37.0, new Date('2012-12-31T18:00:00').toString()),
      createData('Oreo', 437, 18.0, 63, 4.0, new Date('2017-05-04T18:00:00').toString())
    ]
  }

  tableColumns = [
    { key: 'name', sortable: true, label: 'Dessert (100g serving)', filter: true, DataType: 'string' },
    { key: 'date', sortable: true, label: 'Date', filter: true, DataType: 'datetime' },
    { key: 'calories', sortable: true, label: 'Calories' },
    { key: 'fat', sortable: true, label: 'Fat (g)' },
    { key: 'carbs', sortable: true, label: 'Carbs (g)' },
    { key: 'protein', sortable: true, label: 'Protein (g)', filter: true, DataType: 'numeric' }
  ];

  render(){
    return(
      <Grid data={this.state.data} columns={this.tableColumns} rowsPerPage={10}/>
    );
  }
}