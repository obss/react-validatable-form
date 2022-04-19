import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('list-size functional equalTo test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
        funcValue: 2,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', equalTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size functional notEqualTo test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
        funcValue: 4,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', notEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size functional lessThan test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
        funcValue: 4,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', lessThan: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size functional lessThanOrEqualTo test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
        funcValue: 3,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', lessThanOrEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2', 'value3']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size functional greaterThan test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
        funcValue: 4,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', greaterThan: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2', 'value3', 'value4', 'value5']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size functional greaterThanOrEqualTo test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
        funcValue: 5,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', greaterThanOrEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2', 'value3', 'value4', 'value5']);
    });
    expect(result.current.isValid).toBe(true);
});
