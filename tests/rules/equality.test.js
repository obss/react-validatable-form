import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('equality equalTo test', () => {
    const initialFormData = {
        val: 'wrong-thing',
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'equality', equalTo: 'correct value' }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'correct value');
    });
    expect(result.current.isValid).toBe(true);
});

test('equality notEqualTo test', () => {
    const initialFormData = {
        val: 'same value',
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'equality', notEqualTo: 'same value' }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'not same value');
    });
    expect(result.current.isValid).toBe(true);
});

test('equality isOneOf test', () => {
    const initialFormData = {
        val: 'value4',
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'equality', isOneOf: ['value1', 'value2', 'value3'] }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'value1');
    });
    expect(result.current.isValid).toBe(true);
});

test('equality isNoneOf test', () => {
    const initialFormData = {
        val: 'value3',
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'equality', isNoneOf: ['value1', 'value2', 'value3'] }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'value4');
    });
    expect(result.current.isValid).toBe(true);
});
