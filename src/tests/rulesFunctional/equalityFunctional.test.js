import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('equality functional equalTo test', () => {
    const initialFormData = {
        val: 'wrong-thing',
        funcValue: 'correct value',
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'equality', equalTo: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'correct value');
    });
    expect(result.current.isValid).toBe(true);
});

test('equality functional isOneOf test', () => {
    const initialFormData = {
        val: 'value4',
        funcValue: ['value1', 'value2', 'value3'],
    };
    const rules = [
        {
            path: 'val',
            ruleSet: [{ rule: 'required' }, { rule: 'equality', isOneOf: (formData) => formData['funcValue'] }],
            dependantPaths: ['funcValue'],
        },
    ];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.isValid).toBe(false);
    act(() => {
        result.current.setPathValue('val', 'value1');
    });
    expect(result.current.isValid).toBe(true);
});
