import React, { useEffect, useMemo, useState } from 'react';

import type { Column, ColumnPartial, Data, DefaultSort, Filters, SortColumns, SortOrder, State } from '../types';
import { ColumnsProvider, GridzeContext, LocaleProvider } from '../contexts';
import { asArr } from '../utils';

import { Wrapper, WrapperProps } from './Wrapper';

export type GridzeProps<D extends object> = WrapperProps<D> & {
    columns: ColumnPartial<D>[],
    data?: D[] | null,
    defaultSort?: DefaultSort<D>,
    filters?: Filters<D>,
    locale?: string,
};

export function Gridze<D extends object> (Props: GridzeProps<D>) {
    const {
        columns: _columns = [],
        data: __data = [],
        defaultSort,
        filters: __filters = {},
        locale = 'pt-BR',
        ...props
    } = Props;

    if (!asArr(_columns).length) {
        throw new Error('Gridze must have at least one column.');
    }

    const [ filters, setFilters ] = useState<Filters<D>>(__filters);

    const columns = useMemo(() => (
        _columns.map<Column<D>>(col => ({
            type: 'str',
            filter: true,
            sort: true,
            tdProps: {},
            ...col,
        }))
    ), [ _columns ]);

    const _data = useMemo(() => (
        (__data ?? []).map<Data<D>>((row, __key) => ({
            __key,
            ...row,
        }))
    ), [ __data ]);

    const [ data, setData ] = useState<Data<D>[]>(_data);

    useEffect(() => setData(_data), [ _data ]);

    const _sortColumns = useMemo(() => (
        columns.reduce((acc, { id, type }) => {
            acc[id] = { type, order: 'off' };

            return acc;
        }, {} as SortColumns<D>)
    ), [ columns ]);

    const _sortOrder: SortOrder<D> = [];

    for (const [ col, order ] of defaultSort ?? []) {
        _sortOrder.push(col);
        _sortColumns[col].order = order;
    }

    const [ sortColumns, setSortColumns ] = useState<SortColumns<D>>(_sortColumns);
    const [ sortOrder, setSortOrder ] = useState(_sortOrder);

    const state = useMemo<State<D>>(() => ({
        data, filters, sortColumns, sortOrder,
        setData, setFilters, setSortColumns, setSortOrder,
    }), [ data, filters, sortColumns, sortOrder ]);

    return (
        <GridzeContext.Provider value={state}>
            <LocaleProvider locale={locale}>
                <ColumnsProvider columns={columns}>
                    <Wrapper {...props} />
                </ColumnsProvider>
            </LocaleProvider>
        </GridzeContext.Provider>
    );
}
