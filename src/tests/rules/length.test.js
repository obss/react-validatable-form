import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('length equalTo test', () => {
    const initialFormData = {
        val: 'wrong-thing',
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'length', equalTo: 5 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'value');
    });
    expect(result.current.isValid).toBe(true);
});

test('length not equal test', () => {
    const initialFormData = {
        val: 'value',
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'length', notEqualTo: 5 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'correct value');
    });
    expect(result.current.isValid).toBe(true);
});

test('length greaterThan test', () => {
    const initialFormData = {
        val: 'value',
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'length', greaterThan: 5 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'correct value');
    });
    expect(result.current.isValid).toBe(true);
});

test('length greaterThanOrEqualTo test', () => {
    const initialFormData = {
        val: 'valu',
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'length', greaterThanOrEqualTo: 5 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'value');
    });
    expect(result.current.isValid).toBe(true);
});

test('length lessThan test', () => {
    const initialFormData = {
        val: 'long value',
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'length', lessThan: 5 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'valu');
    });
    expect(result.current.isValid).toBe(true);
});

test('length lessThanOrEqualTo test', () => {
    const initialFormData = {
        val: 'long value',
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'length', lessThanOrEqualTo: 5 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'value');
    });
    expect(result.current.isValid).toBe(true);
});
