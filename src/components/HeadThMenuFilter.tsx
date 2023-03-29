import React, { ChangeEventHandler, startTransition, useCallback, useState } from 'react';
import { Input } from '@chakra-ui/react';

import type { Column } from '../types';
import { useGridzeContext } from '../contexts';

import { PopoverMenuLabel } from './PopoverMenuLabel';

type InputChangeEvent = ChangeEventHandler<HTMLInputElement>

export type HeadThMenuFilterProps<D extends object> = Pick<Column<D>, 'id' | 'label'>

export function HeadThMenuFilter<D extends object> (Props: HeadThMenuFilterProps<D>) {
    const { id: column, label } = Props;

    const { filters, setFilters } = useGridzeContext<D>();

    const [ query, setQuery ] = useState(filters[column] ?? '');

    const handleChange = useCallback<InputChangeEvent>(ev => {
        const { target: { value } } = ev;

        setQuery(value);

        startTransition(() => {
            setFilters(old => ({ ...old, [column]: value }));
        });
    }, [ column, setFilters ]);

    return (<>
        <PopoverMenuLabel>Filtro</PopoverMenuLabel>

        <Input
            value={query}
            onChange={handleChange}
            placeholder={label + '...'}
            variant="flushed"
            size="sm"
            mx={3}
            pb={2}
            pt={3}
            px={3}
            w="auto"
        />
    </>);
}
