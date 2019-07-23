import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

const TestHook = ({ callback }) => {
    callback();
    return null;
};

export const testHook = (callback): ReactWrapper => {
    return mount(<TestHook callback={callback} />);
};
