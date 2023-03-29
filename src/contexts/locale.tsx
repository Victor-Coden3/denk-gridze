import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

import type { Locale, StateSetter } from '../types';

export const LocaleStateCtx = createContext<Locale | undefined>(undefined);
export const LocaleUpdaterCtx = createContext<StateSetter<Locale> | undefined>(undefined);

type LocaleProviderProps = PropsWithChildren<{
    locale?: Locale,
}>

export function LocaleProvider (Props: LocaleProviderProps) {
    const { children, locale: _locale } = Props;

    const [ locale, setLocale ] = useState(_locale ?? 'pt-BR');

    return (
        <LocaleStateCtx.Provider value={locale}>
            <LocaleUpdaterCtx.Provider value={setLocale}>
                {children}
            </LocaleUpdaterCtx.Provider>
        </LocaleStateCtx.Provider>
    );
}

export function useLocaleState () {
    const ctx = useContext<Locale | undefined>(LocaleStateCtx);

    if (ctx === undefined) {
        throw new Error('useLocaleState must be inside a Provider with a value.');
    }

    return ctx;
}

export function useLocaleUpdater () {
    const ctx = useContext<StateSetter<Locale> | undefined>(LocaleUpdaterCtx);

    if (ctx === undefined) {
        throw new Error('useLocaleUpdater must be inside a Provider with a value.');
    }

    return ctx;
}

export function useLocale () {
    const locale = useLocaleState();
    const setLocale = useLocaleUpdater();

    return { locale, setLocale } as const;
}
