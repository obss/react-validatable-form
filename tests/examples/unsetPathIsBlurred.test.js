import { testBuilder } from '../TestUtils';
import { act } from '@testing-library/react-hooks';

test('unset path value test', () => {
    const initialFormData = {
        val: 'some value',
    };
    const rules = [{ path: 'val', ruleSet: ['email'] }];
    const result = testBuilder(rules, initialFormData, { showAfterBlur: true });
    expect(result.current.getError('val')).toStrictEqual('Not a valid email');
    act(() => {
        result.current.unsetPathIsBlurred('val');
    });
    expect(result.current.getError('val')).toBeUndefined();
});
