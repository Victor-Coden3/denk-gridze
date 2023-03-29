import { ReactNode } from 'react';
import { Path } from 'ts-dots';
import { BoxProps } from '@chakra-ui/react';

import type { StateSetter, StrNum } from './utils';

export interface withColumnData<D extends object> {
    columnData: Column<D>,
}

export interface withRowData<D extends object> {
    rowData: Data<D>,
}

export interface withActiveSort {
    activeSort: SortColumn['order'],
}

export type Locale = string

export type Data<D extends object> = D & {
    __key: StrNum,
} & Record<string, any>

export type ColumnPartial<D extends object> = {
    id: Path<D> & Path<Data<D>>,
    label: string,
} & Partial<{
    type: SortColumn['type'],

    filter: boolean,
    sort: boolean,

    align: 'left' | 'center' | 'right',
    mono: boolean,

    tdProps: BoxProps,

    w: BoxProps['w'],
    maxW: BoxProps['maxW'],

    textFmt: (options: ColumnTextFormatterOptions<D>) => ReactNode,
}>

export type Column<D extends object> =
    ColumnPartial<D>
    & Required<Pick<ColumnPartial<D>, 'type' | 'filter' | 'sort' | 'tdProps'>>

export type ColumnTextFormatterOptions<D extends object> = {
    val: ReactNode,
    row: Data<D>,
    col: Column<D>,
}

export type Filters<D extends object> = Partial<Record<Path<D>, string>>

export type SortOrder<D extends object> = Path<D>[]

export type SortColumns<D extends object> = Record<Path<D>, SortColumn>

export type SortColumn = {
    order: 'asc' | 'desc' | 'off',
    type: 'str' | 'num' | 'cash' | 'date' | 'time' | 'datetime' | 'bool' | 'jsx',
}

export type DefaultSortTuple<D extends object> = [ Path<D>, SortColumn['order'] ]

export type DefaultSort<D extends object> = DefaultSortTuple<D>[]

export interface State<D extends object = any> {
    data: Data<D>[],
    setData: StateSetter<Data<D>[]>,

    filters: Filters<D>,
    setFilters: StateSetter<Filters<D>>,

    sortColumns: SortColumns<D>,
    setSortColumns: StateSetter<SortColumns<D>>,

    sortOrder: SortOrder<D>,
    setSortOrder: StateSetter<SortOrder<D>>,
}
