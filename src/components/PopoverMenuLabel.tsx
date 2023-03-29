import React from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export function PopoverMenuLabel (Props: HeadingProps) {
    return <Heading as="h4" fontWeight="semibold" py={2} px={4} size="xs" {...Props} />;
}
