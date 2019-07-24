import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

const TestHook = ({ callback, renderCount }) => {
    callback();
    return <div>{renderCount}</div>;
};

export const testHook = (callback): ReactWrapper => {
    return mount(<TestHook callback={callback} renderCount={1} />);
};
