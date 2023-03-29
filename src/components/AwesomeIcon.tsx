import React from 'react';
import { HTMLChakraProps, Text, TextProps } from '@chakra-ui/react';

export type AwesomeIconProps = TextProps & {
    i: string,
    f?: 'l' | 'r' | 's' | 'b',
};

export const AwesomeIcon = React.forwardRef<any, AwesomeIconProps>(function AwesomeIcon (Props, ref) {
    const { f, i, ...props } = Props;

    const styles: HTMLChakraProps<'i'> = {
        alignItems: 'center',
        display: 'flex',
        h: 'full',
        justifyContent: 'center',
        textDecoration: 'none',
        transform: 'rotateZ(0)',
    };

    return (
        <Text as="i" className={'fa' + (f ?? 's') + ' fa-' + i} ref={ref} {...styles} {...props} />
    );
});
