import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('hide before submit test', () => {
    const initialFormData = {
        val: 'some value',
    };
    const rules = [{ path: 'val', ruleSet: ['email'] }];
    const result = testBuilder(rules, initialFormData, { hideBeforeSubmit: true });
    expect(result.current.getError('val')).toBeUndefined();
    act(() => {
        result.current.setFormIsSubmitted();
    });
    expect(result.current.getError('val')).toStrictEqual('Not a valid email');
    act(() => {
        result.current.resetForm();
    });
    expect(result.current.getError('val')).toBeUndefined();
});
