export enum ColumnDataType {
    STRING = 'string',
    NUMERIC = 'numeric',
    BOOLEAN = 'boolean',
    DATE = 'date',
    DATE_TIME = 'datetime',
    DATE_TIME_UTC = 'datetimeutc'
}

export enum ColumnSortDirection {
    NONE = 'None',
    ASCENDING = 'Ascending',
    DESCENDING = 'Descending'
}

export enum CompareOperators {
    NONE = 'None',
    AUTO = 'Auto',
    EQUALS = 'Equals',
    NOT_EQUALS = 'NotEquals',
    CONTAINS = 'Contains',
    STARTS_WITH = 'StartsWith',
    ENDS_WITH = 'EndsWith',
    GTE = 'Gte',
    GT = 'Gt',
    LTE = 'Lte',
    LT = 'Lt',
    MULTIPLE = 'Multiple',
    BETWEEN = 'Between',
    NOT_CONTAINS = 'NotContains',
    NOT_STARTS_WITH = 'NotStartsWith',
    NOT_ENDS_WITH = 'NotEndsWith'
}

export enum AggregateFunctions {
    NONE = 'None',
    SUM = 'Sum',
    AVERAGE = 'Average',
    COUNT = 'Count',
    DISTINCT_COUNT = 'DistinctCount',
    MAX = 'Max',
    MIN = 'Min'
}
