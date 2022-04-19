import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('iban test', () => {
    const initialFormData = {
        val: 'wrong-thing',
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'iban' }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'TR200010009999901234567890');
    });
    expect(result.current.isValid).toBe(true);
});
