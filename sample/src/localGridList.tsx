import {
    GridList, GridListTile,
    GridListTileBar, IconButton,
    ListSubheader
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import * as React from 'react';
import localData from './local/localData';

class LocalGridList extends React.Component<any, any> {
  public state = {
    errorMessage: null as any
  };

  public componentWillReceiveProps(nextProps: any) {
    this.setState({ errorMessage: nextProps.error });
  }

  public render() {

    return (
      <div>
       <GridList cellHeight={180}>
        <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
          <ListSubheader component='div'>Grid</ListSubheader>
        </GridListTile>
        {localData.map((data) => (
          <GridListTile key={data.CustomerName}>
            <GridListTileBar
              title={data.ShippedDate}
              subtitle={<span>by: {data.ShipperCity}</span>}
              actionIcon={
                <IconButton>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      </div>
    );
  }
}

export default LocalGridList;
