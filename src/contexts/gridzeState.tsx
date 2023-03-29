import { createContext, useContext } from 'react';

import type { State } from '../types';

export const GridzeContext = createContext<State | undefined>(undefined);

export function useGridzeContext<D extends object> () {
    const ctx = useContext<State<D> | undefined>(GridzeContext);

    if (ctx === undefined) {
        throw new Error('useGridzeContext must be inside a Provider with a value.');
    }

    return ctx;
}
