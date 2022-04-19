import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('set form data test', () => {
    const initialFormData = {
        val: '',
    };
    const rules = [{ path: 'val', ruleSet: ['required'] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setFormData({ val: 'some value' });
    });
    expect(result.current.isValid).toBe(true);
});
