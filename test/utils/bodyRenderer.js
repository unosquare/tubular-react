const bodyRenderer = (row, index) => 
  <TableRow hover key = { index }>
    <TableCell padding = { 'default' }>
      { row.OrderID}
    </TableCell>
    <TableCell padding = { 'default' }>
      { row.CustomerName}
    </TableCell>
    <TableCell padding = { 'default' }>
      { row.ShippedDate}
    </TableCell>
    <TableCell padding = { 'default' }>
      { row.ShipperCity}
    </TableCell>
  </TableRow>;

export default bodyRenderer;