import React, { memo } from 'react';
import { Flex, HStack, Th } from '@chakra-ui/react';

import type { withColumnData } from '../types';

import { HeadThLabel } from './HeadThLabel';
import { HeadThMenu } from './HeadThMenu';

export type HeadThProps<D extends object> = withColumnData<D>;

function Component<D extends object> (Props: HeadThProps<D>) {
    const { columnData } = Props;
    const { id, label, filter, sort, w, maxW } = columnData;

    const isInteractable = filter || sort;

    return (
        <Th key={id as string} className="gridze-thead-th" fontSize="sm" p={1} {...{ w, maxW }}>
            <Flex as={HStack} spacing={2} h="full" w="full" justify="space-between">
                <HeadThLabel<D> {...{ id, label, filter, sort }} />

                {isInteractable && <HeadThMenu<D> {...{ id, label }} />}
            </Flex>
        </Th>
    );
}

export const HeadTh = memo(Component, (o, n) => {
    return (
        o.columnData.id === n.columnData.id &&
        o.columnData.label === n.columnData.label &&
        o.columnData.filter === n.columnData.filter &&
        o.columnData.sort === n.columnData.sort &&
        o.columnData.w === n.columnData.w &&
        o.columnData.maxW === n.columnData.maxW
    );
}) as typeof Component;
