import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('custom message test', () => {
    const initialFormData = {
        val: '',
    };
    const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];
    const result = testBuilder(rules, initialFormData);
    expect(result.current.validationErrorOriginalResult).toStrictEqual({ val: 'This field is required' });
    act(() => {
        result.current.setRules([{ path: 'val', ruleSet: [{ rule: 'required', customMessage: 'custom message' }] }]);
    });
    expect(result.current.validationErrorOriginalResult).toStrictEqual({ val: 'custom message' });
});
