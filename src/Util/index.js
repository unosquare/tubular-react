const requiredIf = (type, condition) => function(props, propName, componentName) {
  if (typeof type !== 'function') {
    return new Error(
      `Invalid react-required-if prop type supplied to ${componentName}. Validation failed.`
    );
  }

  if (typeof condition !== 'function') {
    return new Error(
      `Invalid react-required-if condition supplied to ${componentName}. Validation failed.`
    );
  }

  const test = condition(props) ? type.isRequired : type;
  return test.apply(this, arguments);
};

export default requiredIf;