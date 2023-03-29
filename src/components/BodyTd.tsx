import React, { memo, ReactNode } from 'react';
import { get } from 'ts-dots';
import { Td } from '@chakra-ui/react';

import type { withColumnData, withRowData } from '../types';
import { useLocaleState } from '../contexts';

export type BodyTdProps<D extends object> = withRowData<D> & withColumnData<D>

function Component<D extends object> (Props: BodyTdProps<D>) {
    const { columnData: col, rowData: row } = Props;

    const locale = useLocaleState();

    const data = get(row, col.id);
    const strData = String(data);

    let textToRender: ReactNode = '';

    col.type ??= 'str';
    const { tdProps, type, textFmt } = col;

    tdProps.pb ??= 2;
    tdProps.px ??= 3;
    tdProps.pt ??= 3;

    if (type !== 'str' && type !== 'jsx') {
        col.mono ??= true;

        if ([ 'num', 'cash' ].includes(type)) {
            col.align ??= 'right';
        } else if ([ 'date', 'datetime', 'time' ].includes(type)) {
            col.align ??= 'center';
        }
    }

    if (textFmt) {
        textToRender = textFmt({ val: data, row, col });
    } else if (type === 'jsx') {
        textToRender = data;
    } else if (type === 'num') {
        textToRender = Number(data);
    } else if (type === 'cash') {
        textToRender = Number(data).toLocaleString(locale, { minimumFractionDigits: 2 });
    } else if (type === 'date') {
        textToRender = data ? new Date(strData).toLocaleDateString(locale) : '—';
    } else if (type === 'time') {
        textToRender = data ? new Date(strData).toLocaleTimeString(locale) : '—';
    } else if (type === 'datetime') {
        textToRender = data ? new Date(strData).toLocaleString(locale) : '—';
    } else if (typeof data !== 'object') {
        textToRender = strData;
    }

    tdProps.textAlign = col.align;
    if (col.mono) tdProps.fontFamily = 'mono';

    if (typeof textToRender === 'object' || type === 'jsx') {
        tdProps.children = textToRender;
    } else {
        tdProps.dangerouslySetInnerHTML = { __html: textToRender + '' };
    }

    return <Td className="gridze-tbody-td" {...tdProps} />;
}

export const BodyTd = memo(Component, (o, n) => {
    const s = JSON.stringify;

    return (
        o.columnData === n.columnData &&
        s(o.rowData) === s(n.rowData)
    );
}) as unknown as typeof Component;
