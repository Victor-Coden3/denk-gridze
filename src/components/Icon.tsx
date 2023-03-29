import React from 'react';
import { Icon as _Icon, IconProps } from '@chakra-ui/react';

export function Icon (Props: IconProps) {
    return (
        <_Icon boxSize={4} p={0} {...Props} />
    );
}
