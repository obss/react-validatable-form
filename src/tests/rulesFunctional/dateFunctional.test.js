import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('date equalTo test', () => {
    const initialFormData = {
        val: new Date('07-08-1999'),
        funcValue: new Date('08-08-1999'),
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'date', equalTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('08-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date notEqualTo test', () => {
    const initialFormData = {
        val: new Date('08-08-1999'),
        funcValue: new Date('08-08-1999'),
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'date', notEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('07-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date greaterThan test', () => {
    const initialFormData = {
        val: new Date('08-08-1999'),
        funcValue: new Date('08-08-1999'),
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'date', greaterThan: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('09-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date greaterThanOrEqualTo test', () => {
    const initialFormData = {
        val: new Date('07-08-1999'),
        funcValue: new Date('08-08-1999'),
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'date', greaterThanOrEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('08-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date lessThan test', () => {
    const initialFormData = {
        val: new Date('08-08-1999'),
        funcValue: new Date('07-08-1999'),
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'date', lessThan: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('06-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});

test('date lessThanOrEqualTo test', () => {
    const initialFormData = {
        val: new Date('08-08-1999'),
        funcValue: new Date('07-08-1999'),
    };
    const rules = [
        {
            path: 'val',
            ruleSet: ['required', { rule: 'date', lessThanOrEqualTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', new Date('07-08-1999'));
    });
    expect(result.current.isValid).toBe(true);
});
