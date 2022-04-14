import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('apply to null test', () => {
    const initialFormData = {
        val: '',
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'email', applyToNulls: false }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(true);
    act(() => {
        result.current.setRules([{ path: 'val', ruleSet: [{ rule: 'email', applyToNulls: true }] }]);
    });
    expect(result.current.isValid).toBe(false);
});
