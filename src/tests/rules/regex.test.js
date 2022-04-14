import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('regex test', () => {
    const initialFormData = {
        val: 'wrong-thing',
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'regex', regex: /ab+c/ }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'abc');
    });
    expect(result.current.isValid).toBe(true);
});
