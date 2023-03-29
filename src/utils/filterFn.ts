import { get, Path } from 'ts-dots';

import type { Locale, State, StrNumBool } from '../types';

export type FilterFnOptions<D extends object> = Pick<State<D>, 'filters' | 'sortColumns'> & {
    locale: Locale,
};

export function filterFn<D extends object> (row: D, options: FilterFnOptions<D>) {
    const { filters, locale, sortColumns } = options;
    let assert = true;

    for (const _colName in filters) {
        const colName = _colName as Path<D>;
        let query: StrNumBool | undefined = filters[colName];

        if (query === null) continue;
        if (query === undefined) continue;
        if (!String(query ?? '').length) continue;

        let content = get(row, colName) as StrNumBool;
        const { type } = sortColumns[colName];

        if (content) {
            if (type === 'date') {
                const date = new Date(String(content || ''));

                content = content + ' ' + date.toLocaleDateString(locale);
            } else if (type === 'datetime') {
                const date = new Date(String(content || ''));

                content = content + ' ' + date.toLocaleString(locale);
            }
        }

        if (type === 'bool') {
            assert = !!(+content) === !!(+query);
        } else {
            query = String(query).toLocaleLowerCase();
            content = String(content).toLocaleLowerCase();

            query = query.replace(/([^a-zA-Z\d ])/gi, '\\$1');
            query = query.split(' ').join('.*');

            assert = !!content.match(new RegExp(query, 'gi'));
        }
    }

    return assert;
}
