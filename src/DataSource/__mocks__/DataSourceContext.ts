import context from './testHelpers';

export const DataSourceContext = ({
    Consumer(props) {
        return props.children(context);
    }
});
