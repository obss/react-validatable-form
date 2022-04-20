import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('enableIf rules', () => {
    const initialFormData = {
        val: '',
        enableValRule: true,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [
                {
                    rule: 'required',
                    enableIf: (formData) => formData['enableValRule'],
                },
            ],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('enableValRule', false);
    });
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.forceRunAllValidations();
    });
    expect(result.current.isValid).toBe(true);
});
