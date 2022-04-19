import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('number test', () => {
    const initialFormData = {
        val: 'not number',
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'number' }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', '123');
    });
    expect(result.current.isValid).toBe(true);
});

test('number equalTo test', () => {
    const initialFormData = {
        val: 5,
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'number', equalTo: 4 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 4);
    });
    expect(result.current.isValid).toBe(true);
});

test('number notEqualTo test', () => {
    const initialFormData = {
        val: 5,
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'number', notEqualTo: 5 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 4);
    });
    expect(result.current.isValid).toBe(true);
});

test('number greaterThan test', () => {
    const initialFormData = {
        val: 3,
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'number', greaterThan: 4 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 5);
    });
    expect(result.current.isValid).toBe(true);
});

test('number greaterThanOrEqualTo test', () => {
    const initialFormData = {
        val: 3,
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'number', greaterThanOrEqualTo: 4 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 4);
    });
    expect(result.current.isValid).toBe(true);
});

test('number lessThan test', () => {
    const initialFormData = {
        val: 5,
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'number', lessThan: 4 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 3);
    });
    expect(result.current.isValid).toBe(true);
});

test('number lessThanOrEqualTo test', () => {
    const initialFormData = {
        val: 5,
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'number', lessThanOrEqualTo: 4 }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 4);
    });
    expect(result.current.isValid).toBe(true);
});
