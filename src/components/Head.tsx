import React from 'react';
import { Thead, Tr } from '@chakra-ui/react';

import { useColumnsState } from '../contexts';

import { HeadTh } from './HeadTh';

export function Head () {
    const columns = useColumnsState();

    return (
        <Thead className="gridze-thead" position="sticky" top={0} zIndex={1}>
            <Tr>
                {columns.map(columnData => <HeadTh key={columnData.id} {...{ columnData }} />)}
            </Tr>
        </Thead>
    );
}
