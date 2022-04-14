import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('list-size equalTo test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', equalTo: 2 }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size notEqualTo test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', notEqualTo: 4 }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size lessThan test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', lessThan: 4 }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size lessThanOrEqualTo test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', lessThanOrEqualTo: 3 }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2', 'value3']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size greaterThan test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', greaterThan: 4 }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2', 'value3', 'value4', 'value5']);
    });
    expect(result.current.isValid).toBe(true);
});

test('list-size greaterThanOrEqualTo test', () => {
    const initialFormData = {
        val: ['value1', 'value2', 'value3', 'value4'],
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'listSize', greaterThanOrEqualTo: 5 }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', ['value1', 'value2', 'value3', 'value4', 'value5']);
    });
    expect(result.current.isValid).toBe(true);
});
