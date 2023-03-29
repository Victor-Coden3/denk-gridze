import React, { memo } from 'react';
import { Box, BoxProps, Table, TableContainer } from '@chakra-ui/react';

import { useGridzeContext } from '../contexts';

import { Head } from './Head';
import { Body } from './Body';

export type WrapperProps<D extends object> = {
    tableSx?: BoxProps['sx'],
    wrapperSx?: BoxProps['sx'],
    overflowX?: boolean,
};

function Component<D extends object> (Props: WrapperProps<D>) {
    const { tableSx, wrapperSx: _wrapperSx, overflowX } = Props;

    const { data } = useGridzeContext();

    const wrapperSx = {
        whiteSpace: 'normal',
        ..._wrapperSx ?? {},
        ...(overflowX === false ? {
            maxWidth: 'full',
        } : {
            overflowX: 'auto',

            /* '.gridze-table': {
                w: 'max',
                minWidth: 'full',
            }, */
        }),
    };

    return (
        <TableContainer
            className="gridze-wrapper"
            h="full"
            overflowY="visible"
            w="full"
            sx={wrapperSx}
        >
            <Table
                className="gridze-table"
                variant="striped"
                h="fit-content"
                position="relative"
                w="full"
                sx={tableSx}
            >
                <Head />

                {!!data.length && <Body />}
            </Table>

            {!data.length && <Box w="full" my={4} px={2} textAlign="center">Nenhum dado disponível.</Box>}
        </TableContainer>
    );
}

export const Wrapper = memo(Component, (o, n) => {
    const s = JSON.stringify;

    return (
        o.overflowX === n.overflowX &&
        s(o.tableSx) === s(n.tableSx) &&
        s(o.wrapperSx) === s(n.wrapperSx)
    );
}) as unknown as typeof Component;
