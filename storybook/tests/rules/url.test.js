import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('url test', () => {
    const initialFormData = {
        val: 'wrong-thing',
    };
    const rules = [{ path: 'val', ruleSet: ['required', { rule: 'url' }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'www.example.com');
    });
    expect(result.current.isValid).toBe(true);
});
