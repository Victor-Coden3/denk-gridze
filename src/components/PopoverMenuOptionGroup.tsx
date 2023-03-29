import React, { Children, cloneElement, isValidElement, PropsWithChildren, ReactNode } from 'react';
import { StackProps, useRadioGroup, UseRadioGroupProps, VStack } from '@chakra-ui/react';

import { PopoverMenuLabel } from './PopoverMenuLabel';

export type PopoverMenuOptionGroupProps = PropsWithChildren<UseRadioGroupProps & {
    label?: ReactNode,
    stackProps?: StackProps,
}>;

export function PopoverMenuOptionGroup (Props: PopoverMenuOptionGroupProps) {
    const { children, label, stackProps, ...radioGroupProps } = Props;
    const { getRootProps, getRadioProps } = useRadioGroup(radioGroupProps);

    return (<>
        {label && <PopoverMenuLabel>{label}</PopoverMenuLabel>}

        <VStack {...getRootProps()} spacing={0}>
            {Children.map(children, (node) => {
                if (!isValidElement(node)) return null;

                return cloneElement(node, {
                    key: node.props.value,
                    ...getRadioProps(node.props),
                });
            })}
        </VStack>
    </>);
}
