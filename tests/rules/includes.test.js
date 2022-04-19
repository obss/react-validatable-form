import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('includes test', () => {
    const initialFormData = {
        val: 'wrong-thing',
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'includes', includes: 'some' }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'some value');
    });
    expect(result.current.isValid).toBe(true);
});
