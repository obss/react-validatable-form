import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('required test', () => {
    const initialFormData = {
        val: '',
    };
    const rules = [{ path: 'val', ruleSet: ['required'] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'some value');
    });
    expect(result.current.isValid).toBe(true);
});
