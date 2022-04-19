import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('includes functional test', () => {
    const initialFormData = {
        val: 'wrong-thing',
        funcValue: 'some',
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'includes', includes: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'some value');
    });
    expect(result.current.isValid).toBe(true);
});
