import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('length functional equalTo test', () => {
    const initialFormData = {
        val: 'wrong-thing',
        funcValue: 5,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'length', equalTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'value');
    });
    expect(result.current.isValid).toBe(true);
});

test('length functional not equal test', () => {
    const initialFormData = {
        val: 'value',
        funcValue: 5,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'length', notEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'correct value');
    });
    expect(result.current.isValid).toBe(true);
});

test('length functional greaterThan test', () => {
    const initialFormData = {
        val: 'value',
        funcValue: 5,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'length', greaterThan: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'correct value');
    });
    expect(result.current.isValid).toBe(true);
});

test('length functional greaterThanOrEqualTo test', () => {
    const initialFormData = {
        val: 'valu',
        funcValue: 5,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'length', greaterThanOrEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'value');
    });
    expect(result.current.isValid).toBe(true);
});

test('length functional lessThan test', () => {
    const initialFormData = {
        val: 'long value',
        funcValue: 5,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'length', lessThan: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'valu');
    });
    expect(result.current.isValid).toBe(true);
});

test('length functional lessThanOrEqualTo test', () => {
    const initialFormData = {
        val: 'long value',
        funcValue: 5,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'length', lessThanOrEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'value');
    });
    expect(result.current.isValid).toBe(true);
});
