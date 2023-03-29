import React from 'react';
import {
    Button,
    Divider,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
} from '@chakra-ui/react';

import type { Column } from '../types';

import { AwesomeIcon } from './AwesomeIcon';
import { HeadThMenuSort } from './HeadThMenuSort';
import { HeadThMenuFilter } from './HeadThMenuFilter';

export type HeadThMenuProps<D extends object> = Pick<Column<D>, 'id' | 'label'>

export function HeadThMenu<D extends object> (Props: HeadThMenuProps<D>) {
    const { id, label } = Props;

    return (
        <Popover placement="bottom-start" isLazy lazyBehavior="unmount">
            <PopoverTrigger>
                <Button className="gridze-thead-th-menu-trigger" variant="ghost" size="sm">
                    <AwesomeIcon i="bars" />
                </Button>
            </PopoverTrigger>

            <Portal>
                <PopoverContent className="gridze-thead-th-menu-content" w={48} zIndex={100}>
                    <PopoverArrow />
                    <PopoverBody
                        className="gridze-thead-th-menu-body"
                        display="flex"
                        flexDirection="column"
                        flexWrap="nowrap"
                        px={0}
                        py={2}
                        textTransform="none"
                    >
                        <HeadThMenuSort<D> {...{ id }} />

                        <Divider my={2} />

                        <HeadThMenuFilter<D> {...{ id, label }} />
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}
