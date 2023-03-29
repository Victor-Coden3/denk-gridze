import React, { memo } from 'react';
import { Tr } from '@chakra-ui/react';

import type { withRowData } from '../types';
import { useColumnsState } from '../contexts';

import { BodyTd } from './BodyTd';

export type BodyTrProps<D extends object> = withRowData<D>;

function Component<D extends object> (Props: BodyTrProps<D>) {
    const { rowData } = Props;

    const columns = useColumnsState();

    return (
        <Tr className="gridze-tbody-tr">
            {columns.map(columnData => <BodyTd key={columnData.id} {...{ columnData, rowData }} />)}
        </Tr>
    );
}

export const BodyTr = memo(Component, (o, n) => {
    const s = JSON.stringify;

    return (
        s(o.rowData) === s(n.rowData)
    );
}) as unknown as typeof Component;
