import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('number functional equalTo test', () => {
    const initialFormData = {
        val: 5,
        funcValue: 4,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'number', equalTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 4);
    });
    expect(result.current.isValid).toBe(true);
});

test('number functional notEqualTo test', () => {
    const initialFormData = {
        val: 5,
        funcValue: 5,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'number', notEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 4);
    });
    expect(result.current.isValid).toBe(true);
});

test('number functional greaterThan test', () => {
    const initialFormData = {
        val: 3,
        funcValue: 4,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'number', greaterThan: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 5);
    });
    expect(result.current.isValid).toBe(true);
});

test('number functional greaterThanOrEqualTo test', () => {
    const initialFormData = {
        val: 3,
        funcValue: 4,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [
                { rule: 'required' },
                { rule: 'number', greaterThanOrEqualTo: (formData) => formData['funcValue'] },
            ],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 4);
    });
    expect(result.current.isValid).toBe(true);
});

test('number functional lessThan test', () => {
    const initialFormData = {
        val: 5,
        funcValue: 4,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'number', lessThan: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 3);
    });
    expect(result.current.isValid).toBe(true);
});

test('number functional lessThanOrEqualTo test', () => {
    const initialFormData = {
        val: 5,
        funcValue: 4,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'number', lessThanOrEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 4);
    });
    expect(result.current.isValid).toBe(true);
});
