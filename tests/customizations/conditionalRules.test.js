import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('disableIf rules', () => {
    const initialFormData = {
        val: '',
        disableValRule: false,
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [
                {
                    rule: 'required',
                    disableIf: (formData) => formData['disableValRule'],
                },
            ],
            dependantPaths: ['disableValRule'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('disableValRule', true);
    });
    expect(result.current.isValid).toBe(true);
});

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
            dependantPaths: ['enableValRule'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('enableValRule', false);
    });
    expect(result.current.isValid).toBe(true);
});
