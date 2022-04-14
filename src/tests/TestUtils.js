import ReactValidatableFormProvider from '../ReactValidatableFormProvider';
import { renderHook } from '@testing-library/react-hooks';
import useValidatableForm from '../useValidatableForm';
import * as React from 'react';

export const testBuilder = (rules, initialFormData) => {
    const wrapper = ({ children }) => <ReactValidatableFormProvider> {children} </ReactValidatableFormProvider>;
    const { result } = renderHook(
        () =>
            useValidatableForm({
                rules,
                initialFormData,
            }),
        { wrapper }
    );
    return result;
};
