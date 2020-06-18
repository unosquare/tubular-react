import * as React from 'react';
import { ColumnModel, CompareOperators } from 'tubular-common';
import { TbNotContainsIcon } from '../SvgIcons/TbNotContainsIcon';
import { TbContainsIcon } from '../SvgIcons/TbContainsIcon';
import { TbStartsWithIcon } from '../SvgIcons/TbStartsWithIcon';
import { TbNotStartsWithIcon } from '../SvgIcons/TbNotStartsWithIcon';
import { TbEndsWithIcon } from '../SvgIcons/TbEndsWithIcon';
import { TbNotEndsWithIcon } from '../SvgIcons/TbNotEndsWithIcon';
import { TbEqualsIcon } from '../SvgIcons/TbEqualsIcon';
import { TbGreaterThanIcon } from '../SvgIcons/TbGreaterThanIcon';
import { TbNotEqualsIcon } from '../SvgIcons/TbNotEqualsIcon';
import { TbGreaterOrEqualsToIcon } from '../SvgIcons/TbGreaterOrEqualsToIcon';
import { TbLessThanIcon } from '../SvgIcons/TbLessThanIcon';
import { TbLessOrEqualsToIcon } from '../SvgIcons/TbLessOrEqualsToIcon';
import { TbBetweenIcon } from '../SvgIcons/TbBetweenIcon';
import FilterListIcon from '@material-ui/icons/FilterList';

export const handleFilterChange = (column: ColumnModel) => (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
) => {
    column.filterText = event.target.value;
};

export const onKeyDown = (onEnter: () => void) => (ev: React.KeyboardEvent) => {
    if (ev.keyCode === 13 && onEnter) {
        ev.preventDefault();
        ev.stopPropagation();
        onEnter();
    }
};

export interface FilterEditorProps {
    column: ColumnModel;
    onApply: () => void;
}

export const getOperatorText = (value: CompareOperators, title: string) => {
    switch (value) {
        case CompareOperators.NotContains:
        case CompareOperators.Contains:
        case CompareOperators.StartsWith:
        case CompareOperators.NotStartsWith:
        case CompareOperators.EndsWith:
        case CompareOperators.NotEndsWith:
        case CompareOperators.Equals:
        case CompareOperators.NotEquals:
        case CompareOperators.Between:
            return title;
        case CompareOperators.Gt:
            return 'Greater than';
        case CompareOperators.Gte:
            return 'Greater than or equals to';
        case CompareOperators.Lt:
            return 'Less than';
        case CompareOperators.Lte:
            return 'Less than or equals to';
        default:
            return 'None';
    }
};

export const getOperatorIcon = (operator: CompareOperators): JSX.Element => {
    switch (operator) {
        case CompareOperators.NotContains:
            return <TbNotContainsIcon />;
        case CompareOperators.Contains:
            return <TbContainsIcon />;
        case CompareOperators.StartsWith:
            return <TbStartsWithIcon />;
        case CompareOperators.NotStartsWith:
            return <TbNotStartsWithIcon />;
        case CompareOperators.EndsWith:
            return <TbEndsWithIcon />;
        case CompareOperators.NotEndsWith:
            return <TbNotEndsWithIcon />;
        case CompareOperators.Equals:
            return <TbEqualsIcon />;
        case CompareOperators.NotEquals:
            return <TbNotEqualsIcon />;
        case CompareOperators.Gt:
            return <TbGreaterThanIcon />;
        case CompareOperators.Gte:
            return <TbGreaterOrEqualsToIcon />;
        case CompareOperators.Lt:
            return <TbLessThanIcon />;
        case CompareOperators.Lte:
            return <TbLessOrEqualsToIcon />;
        case CompareOperators.Between:
            return <TbBetweenIcon />;
        default:
            return <FilterListIcon />;
    }
};
