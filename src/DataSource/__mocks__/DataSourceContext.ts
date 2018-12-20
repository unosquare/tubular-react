import context from './testHelpers';

export const DataSourceContext = {
  Consumer(props: any) {
    return props.children(context);
  },
};
