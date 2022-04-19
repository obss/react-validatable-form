import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('validation error original test', () => {
    const initialFormData = {
        val1: '',
        val2: 'short',
    };
    const rules = [
        { path: 'val1', ruleSet: ['required'] },
        { path: 'val2', ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThan: 5 }] },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.getError('val1')).toStrictEqual('This field is required');
    expect(result.current.getError('val2')).toStrictEqual('This field should have more than 5 characters');
    act(() => {
        result.current.setPathValue('val1', 'val');
        result.current.setPathValue('val2', 'long value');
    });
    expect(result.current.getError('val1')).toBeUndefined();
    expect(result.current.getError('val2')).toBeUndefined();
});
