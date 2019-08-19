import * as React from 'react';

const useGridRefresh = (): [number, () => void] => {
    const [refresh, setRefreshCounter] = React.useState(0);

    return [refresh, () => {
        setRefreshCounter(refresh + 1);
    }];
};

export default useGridRefresh;
