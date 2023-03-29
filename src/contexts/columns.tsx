import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import type { Column, StateSetter } from '../types';

type Columns<D extends object = any> = Column<D>[];

export const ColumnsStateCtx = createContext<Columns | undefined>(undefined);
export const ColumnsUpdaterCtx = createContext<StateSetter<Columns> | undefined>(undefined);

type ColumnsProviderProps = PropsWithChildren<{
    columns: Columns,
}>

export function ColumnsProvider (Props: ColumnsProviderProps) {
    const { children, columns: _columns } = Props;

    const [ columns, setColumns ] = useState(_columns);

    useEffect(() => setColumns(_columns), [ _columns ]);

    return (
        <ColumnsStateCtx.Provider value={columns}>
            <ColumnsUpdaterCtx.Provider value={setColumns}>
                {children}
            </ColumnsUpdaterCtx.Provider>
        </ColumnsStateCtx.Provider>
    );
}

export function useColumnsState<D extends object> () {
    const ctx = useContext(ColumnsStateCtx) as Columns<D> | undefined;

    if (ctx === undefined) {
        throw new Error('useColumnsState must be inside a Provider with a value.');
    }

    return ctx;
}

export function useColumnsUpdater<D extends object> () {
    const ctx = useContext(ColumnsUpdaterCtx) as StateSetter<Columns<D>> | undefined;

    if (ctx === undefined) {
        throw new Error('useColumnsUpdater must be inside a Provider with a value.');
    }

    return ctx;
}

export function useColumns<D extends object> () {
    const columns = useColumnsState<D>();
    const setColumns = useColumnsUpdater<D>();

    return { columns, setColumns } as const;
}
