import React, { useCallback, useMemo } from 'react';
import { Button, chakra, HStack } from '@chakra-ui/react';

import type { Column } from '../types';
import { useGridzeContext } from '../contexts';
import { sortHandler } from '../handlers';

import { AwesomeIcon } from './AwesomeIcon';

export type HeadThLabelProps<D extends object> = Pick<Column<D>, 'id' | 'label' | 'filter' | 'sort'>

export function HeadThLabel<D extends object> (Props: HeadThLabelProps<D>) {
    const { id: column, label, filter: isFilterable, sort: isSortable } = Props;

    const { filters, sortColumns, setSortColumns, setSortOrder } = useGridzeContext<D>();

    const activeFilter = !!filters[column];
    const activeSort = sortColumns[column]?.order ?? 'off';

    const isInteractable = isFilterable || isSortable;

    const filterIcon = useMemo(() => {
        if (!activeFilter) return null;

        return <AwesomeIcon i="filter" h="full" p={0} />;
    }, [ activeFilter ]);

    const sortIcon = useMemo(() => {
        if (activeSort === 'off') return null;

        const dir = activeSort === 'asc' ? 'up' : 'down';

        return <AwesomeIcon i={'arrow-' + dir + '-long'} h="full" p={0} />;
    }, [ activeSort ]);

    const handleSort = useCallback(() => {
        sortHandler<D>({ column, order: 'toggle', setSortColumns, setSortOrder });
    }, [ column ]);

    return (
        <Button
            as={HStack}
            className="gridze-thead-th-label"
            variant="ghost"
            size="sm"
            spacing={2}
            {...(isInteractable ? { cursor: 'pointer', onClick: handleSort } : {})}
        >
            <chakra.span>{label}</chakra.span>

            {sortIcon}
            {filterIcon}
        </Button>
    );
}
