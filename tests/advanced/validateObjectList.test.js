import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('validate object list test', () => {
    const initialFormData = {
        listChild: [
            { id: '1', value: '' },
            { id: '2', value: '' },
        ],
    };
    const rules = [
        {
            listPath: 'listChild',
            subRules: [
                {
                    path: 'id',
                    ruleSet: ['required', 'number'],
                },
                {
                    path: 'value',
                    ruleSet: ['required'],
                },
            ],
        },
        {
            path: 'listChild',
            ruleSet: ['required'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('listChild', [
            { id: 1, value: 'value1' },
            { id: 2, value: 'value2' },
        ]);
    });
    expect(result.current.isValid).toBe(true);
});
