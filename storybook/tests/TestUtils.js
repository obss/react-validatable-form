import { renderHook } from '@testing-library/react-hooks';
import { ReactValidatableFormProvider, useValidatableForm } from 'react-validatable-form';
import * as React from 'react';

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
