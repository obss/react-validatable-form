import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('set path value test', () => {
    const initialFormData = {
        val: 'some value',
    };
    const rules = [{ path: 'val', ruleSet: ['email'] }];
    const result = testBuilder(rules, initialFormData, { showAfterBlur: true, hideBeforeSubmit: true });
    expect(result.current.getError('val')).toBeUndefined();
    act(() => {
        result.current.setPathIsBlurred('val');
    });
    expect(result.current.getError('val')).toStrictEqual('Not a valid email');
});
