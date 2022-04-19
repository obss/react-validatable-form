import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('validate list test', () => {
    const initialFormData = {
        listChild: ['a', 'b'],
    };
    const rules = [
        {
            path: 'listChild',
            ruleSet: ['required', { rule: 'length', greaterThan: 2 }],
        },
        {
            listPath: 'listChild',
            ruleSet: ['required', { rule: 'length', greaterThan: 5 }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('listChild', ['a', 'b', 'c']);
    });
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('listChild', ['value1', 'value2', 'value3']);
    });
    expect(result.current.isValid).toBe(true);
});
