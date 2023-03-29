import { Path } from 'ts-dots';

import type { SortColumn, State } from '../types';

export type SortHandlerOptions<D extends object> = {
    column: Path<D>,
    order?: SortColumn['order'] | 'toggle',
    setSortColumns: State<D>['setSortColumns'],
    setSortOrder: State<D>['setSortOrder'],
};

export function sortHandler<D extends object> (options: SortHandlerOptions<D>) {
    const { column, setSortColumns, setSortOrder } = options;
    let { order = 'toggle' } = options;

    setSortColumns(_columns => {
        const current = _columns[column];
        const orderCurrent = current.order;

        if (order === 'toggle') {
            order = 'off';

            if (orderCurrent === 'off') order = 'asc';
            else if (orderCurrent === 'asc') order = 'desc';
        }

        return {
            ..._columns,
            [column]: { ...current, order },
        };
    });

    setSortOrder(_order => [
        ..._order.filter((self) => self !== column),
        ...(order !== 'off' ? [ column ] : []),
    ]);
}
