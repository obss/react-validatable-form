import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('email test', () => {
    const initialFormData = {
        val: 'wrong-thing',
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'email' }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'example@hotmail.com');
    });
    expect(result.current.isValid).toBe(true);
});
