import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('set form data and rules test', () => {
    const initialFormData = {
        val: 'example@hotmail.com',
    };
    const rules = [{ path: 'val', ruleSet: ['email'] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(true);
    act(() => {
        result.current.setFormDataAndRules(
            {
                val: 5,
            },
            [
                {
                    path: 'val',
                    ruleSet: ['number'],
                },
            ]
        );
    });
    expect(result.current.isValid).toBe(true);
});
