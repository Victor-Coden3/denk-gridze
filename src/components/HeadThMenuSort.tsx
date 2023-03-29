import React, { useCallback } from 'react';

import type { Column } from '../types';
import { useGridzeContext } from '../contexts';
import { sortHandler, SortHandlerOptions } from '../handlers';

import { PopoverMenuOptionItem } from './PopoverMenuOptionItem';
import { PopoverMenuOptionGroup } from './PopoverMenuOptionGroup';

export type HeadThMenuSortProps<D extends object> = Pick<Column<D>, 'id'>

export function HeadThMenuSort<D extends object> (Props: HeadThMenuSortProps<D>) {
    const { id: column } = Props;

    const { sortColumns, setSortColumns, setSortOrder } = useGridzeContext<D>();

    const activeSort = sortColumns[column]?.order ?? 'off';

    const handleSort = useCallback((_order?: string) => {
        const order = _order as SortHandlerOptions<D>['order'];

        sortHandler<D>({ column, order, setSortColumns, setSortOrder });
    }, [ column ]);

    return (
        <PopoverMenuOptionGroup
            label="Ordenação"
            defaultValue={activeSort}
            onChange={handleSort}
        >
            <PopoverMenuOptionItem value="asc">Crescente</PopoverMenuOptionItem>
            <PopoverMenuOptionItem value="desc">Decrescente</PopoverMenuOptionItem>

            {activeSort !== 'off' && <PopoverMenuOptionItem value="off">Remover</PopoverMenuOptionItem>}
        </PopoverMenuOptionGroup>
    );
}
