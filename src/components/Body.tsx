import React, { useMemo } from 'react';
import { Tbody } from '@chakra-ui/react';

import { useGridzeContext, useLocaleState } from '../contexts';
import { filterFn, sortFn } from '../utils';

import { BodyTr } from './BodyTr';

export function Body () {
    const { data, filters, sortColumns, sortOrder } = useGridzeContext();
    const locale = useLocaleState();

    const dataFiltered = useMemo(() => (
        data.filter(row => filterFn(row, { filters, locale, sortColumns }))
    ), [ data, filters, locale, sortColumns ]);

    const dataSorted = useMemo(() => (
        !sortOrder.length
            ? dataFiltered
            : dataFiltered.sort((a, b) => sortFn(a, b, { sortColumns, sortOrder }))
    ), [ dataFiltered, sortColumns, sortOrder ]);

    return (
        <Tbody className="gridze-tbody">
            {dataSorted.map((rowData) => <BodyTr key={rowData.__key} {...{ rowData }} />)}
        </Tbody>
    );
}
