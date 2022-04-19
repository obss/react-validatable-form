import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import ReactValidatableFormProvider from '../src/lib/ReactValidatableFormProvider';
import useValidatableForm from '../src/lib/useValidatableForm';

export const testBuilder = (rules, initialFormData, hookProps, providerProps) => {
    const wrapper = ({ children }) => (
        <ReactValidatableFormProvider {...providerProps}> {children} </ReactValidatableFormProvider>
    );
    const { result } = renderHook(
        () =>
            useValidatableForm({
                rules,
                initialFormData,
                ...hookProps,
            }),
        { wrapper }
    );
    return result;
};
