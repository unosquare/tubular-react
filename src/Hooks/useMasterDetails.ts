import * as React from 'react';

const useMasterDetails = (): [boolean, () => void] => {
    const [open, openDetails] = React.useState(false);

    return [open, () => {
        openDetails(!open)
    }];
}

export default useMasterDetails;