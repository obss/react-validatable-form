import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('set rules test', () => {
    const initialFormData = {
        val: 'example@hotmail.com',
    };
    const rules = [{ path: 'val', ruleSet: ['number'] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setRules([{ path: 'val', ruleSet: ['email'] }]);
    });
    expect(result.current.isValid).toBe(true);
});
