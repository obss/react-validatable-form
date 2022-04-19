import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('validation error original test', () => {
    const initialFormData = {
        val1: 'loooong value',
        val2: 'short',
    };
    const rules = [
        { path: 'val1', ruleSet: [{ rule: 'required' }, { rule: 'length', lessThan: 8 }] },
        { path: 'val2', ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThan: 5 }] },
    ];
    const result = testBuilder(rules, initialFormData, { hideBeforeSubmit: true, showAfterBlur: true });
    expect(result.current.getError('val1')).toBeUndefined();
    expect(result.current.getError('val2')).toBeUndefined();
    act(() => {
        result.current.setFormIsSubmitted();
    });
    expect(result.current.getError('val1')).toStrictEqual('This field should have less than 8 characters');
    expect(result.current.getError('val2')).toStrictEqual('This field should have more than 5 characters');
    act(() => {
        result.current.setPathValue('val1', 'short');
        result.current.setPathValue('val2', 'long value');
    });
    expect(result.current.getError('val1')).toBeUndefined();
    expect(result.current.getError('val2')).toBeUndefined();
});
