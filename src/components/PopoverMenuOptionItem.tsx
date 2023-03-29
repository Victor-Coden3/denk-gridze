import React, { memo, PropsWithChildren } from 'react';
import { Box, Button, ButtonProps, useRadio, UseRadioProps } from '@chakra-ui/react';

import { AwesomeIcon } from './AwesomeIcon';

export type PopoverMenuOptionItemProps = PropsWithChildren<UseRadioProps & {
    value: string,
    buttonProps?: ButtonProps,
}>;

export function Component (Props: PopoverMenuOptionItemProps) {
    const { children, buttonProps, ...radioProps } = Props;
    const { getInputProps, getCheckboxProps, state: { isChecked } } = useRadio(radioProps);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label" w="full">
            <input {...input} />
            <Button
                as={Box}
                {...checkbox}
                variant="ghost"
                borderRadius="none"
                colorScheme="gray"
                cursor="pointer"
                fontWeight="normal"
                justifyContent="flex-start"
                m={0}
                pb={2}
                pt={3}
                px={3}
                size="sm"
                w="full"
                {...buttonProps}
                leftIcon={<AwesomeIcon i="check" opacity={Number(isChecked)} />}
            >
                {children}
            </Button>
        </Box>
    );
}

export const PopoverMenuOptionItem = memo(Component) as unknown as typeof Component;
