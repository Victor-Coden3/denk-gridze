import { Dispatch, SetStateAction } from 'react';

export type StrNum = string | number;
export type StrNumBool = StrNum | boolean;

export type StateSetter<Data> = Dispatch<SetStateAction<Data>>;

