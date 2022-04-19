import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('unset path value test', () => {
    const initialFormData = {
        val: 'some value',
    };
    const rules = [{ path: 'val', ruleSet: ['required'] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(true);
    act(() => {
        result.current.unsetPathValue('val');
    });
    expect(result.current.isValid).toBe(false);
});
