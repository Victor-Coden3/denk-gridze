import { get } from 'ts-dots';

import type { State, StrNumBool } from '../types';
import { spaceship } from './general';

export type SortFnOptions<D extends object> = Pick<State<D>, 'sortColumns' | 'sortOrder'>;

export function sortFn<D extends object> (objA: D, objB: D, options: SortFnOptions<D>) {
    const { sortColumns, sortOrder } = options;

    const A: number[] = [];
    const B: number[] = [];

    for (const column of sortOrder) {
        const { type, order } = sortColumns[column]!;

        if (order === 'off') continue;

        let contentA = get(objA, column) as StrNumBool;
        let contentB = get(objB, column) as StrNumBool;

        if (type === 'date' || type === 'datetime') {
            contentA = String(contentA || '') || 0;
            contentB = String(contentB || '') || 0;

            contentA = new Date(contentA).getTime();
            contentB = new Date(contentB).getTime();
        } else if ([ 'num', 'cash', 'bool' ].includes(type)) {
            contentA = +contentA;
            contentB = +contentB;
        }

        if (order === 'asc') {
            A.push(spaceship(contentA, contentB));
            B.push(spaceship(contentB, contentA));
        } else {
            A.push(spaceship(contentB, contentA));
            B.push(spaceship(contentA, contentB));
        }
    }

    return spaceship(A, B);
}
