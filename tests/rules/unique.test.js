import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('unique test', () => {
    const initialFormData = {
        listChild: ['a', 'a'],
    };
    const rules = [
        {
            listPath: 'listChild',
            ruleSet: ['required', { rule: 'unique' }],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('listChild', ['a', 'b']);
    });
    expect(result.current.isValid).toBe(true);
});
