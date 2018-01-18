import Grid from '../../src/Grid/Grid';
import React from 'react';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

export default class Main extends React.Component{

  state = {
    data: [
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Donut', 452, 25.0, 51, 4.9),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
      createData('Honeycomb', 408, 3.2, 87, 6.5),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Jelly Bean', 375, 0.0, 94, 0.0),
      createData('KitKat', 518, 26.0, 65, 7.0),
      createData('Lollipop', 392, 0.2, 98, 0.0),
      createData('Marshmallow', 318, 0, 81, 2.0),
      createData('Nougat', 360, 19.0, 9, 37.0),
      createData('Oreo', 437, 18.0, 63, 4.0),
    ]
  }

  tableColumns = [
    { key: 'name', sortable: true, label: 'Dessert (100g serving)', filter: true, columnType: "string" },
    { key: 'calories', sortable: true, label: 'Calories' },
    { key: 'fat', sortable: true, label: 'Fat (g)' },
    { key: 'carbs', sortable: true, label: 'Carbs (g)' },
    { key: 'protein', sortable: true, label: 'Protein (g)', filter: true, columnType: "numeric" },
  ];

  render(){
    return(
      <Grid data={this.state.data} columns={this.tableColumns} rowsPerPage={10}/>
    );
  }
}